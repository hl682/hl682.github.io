/*
 * Private visitor tracker (owner-only).
 * Sends anonymous-to-the-visitor beacons to a serverless endpoint (Google Apps Script).
 * Config is injected via window.__VT in the custom analytics include.
 *
 * Captures: page path/title, referrer, language, timezone, screen/viewport,
 * user agent, approximate IP + geolocation, download-button clicks,
 * time-on-page (duration) and max scroll depth.
 */
(function () {
  var cfg = window.__VT || {};
  if (!cfg.enabled || !cfg.endpoint) return;

  var start = Date.now();
  var sessionId =
    Math.random().toString(36).slice(2) + Date.now().toString(36);
  var maxScroll = 0;
  var exitSent = false;
  var enriched = null; // cached IP/geo lookup result

  function nowISO() {
    return new Date().toISOString();
  }

  function base() {
    return {
      token: cfg.token || "",
      session: sessionId,
      url: location.pathname + location.search,
      title: document.title,
      referrer: document.referrer || "(direct)",
      lang: navigator.language || "",
      tz: (Intl.DateTimeFormat().resolvedOptions().timeZone) || "",
      screen: screen.width + "x" + screen.height,
      viewport: window.innerWidth + "x" + window.innerHeight,
      ua: navigator.userAgent || "",
      ts: nowISO()
    };
  }

  function withGeo(data) {
    if (enriched) {
      data.ip = enriched.ip;
      data.city = enriched.city;
      data.region = enriched.region;
      data.country = enriched.country;
      data.org = enriched.org;
    }
    return data;
  }

  function send(data, useBeacon) {
    try {
      var body = JSON.stringify(data);
      if (useBeacon && navigator.sendBeacon) {
        var blob = new Blob([body], { type: "text/plain;charset=UTF-8" });
        navigator.sendBeacon(cfg.endpoint, blob);
      } else {
        fetch(cfg.endpoint, {
          method: "POST",
          mode: "no-cors",
          keepalive: true,
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: body
        });
      }
    } catch (e) {
      /* silent */
    }
  }

  function trackPageview() {
    var data = base();
    data.type = "pageview";
    if (cfg.ipLookup) {
      fetch(cfg.ipLookup)
        .then(function (r) {
          return r.json();
        })
        .then(function (g) {
          enriched = {
            ip: g.ip || "",
            city: g.city || "",
            region: g.region || g.region_code || "",
            country: g.country_name || g.country || "",
            org: g.org || g.asn || ""
          };
          send(withGeo(data), false);
        })
        .catch(function () {
          send(data, false);
        });
    } else {
      send(data, false);
    }
  }

  // Max scroll depth (percentage)
  window.addEventListener(
    "scroll",
    function () {
      var el = document.documentElement;
      var total = el.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      var depth = Math.round((el.scrollTop / total) * 100);
      if (depth > maxScroll) maxScroll = Math.min(depth, 100);
    },
    { passive: true }
  );

  // Download / file clicks
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a") : null;
      if (!a) return;
      var href = a.getAttribute("href") || "";
      var isFile = /\.(pdf|zip|rar|7z|docx?|pptx?|xlsx?|csv|mp4|mov|jpe?g|png|gif|svg)(\?.*)?$/i.test(
        href
      );
      if (isFile || a.hasAttribute("download")) {
        send(
          withGeo({
            type: "download",
            token: cfg.token || "",
            session: sessionId,
            file: href,
            text: (a.textContent || "").trim(),
            url: location.pathname,
            ts: nowISO()
          }),
          true
        );
      }
    },
    true
  );

  // Time-on-page + scroll depth on exit
  function sendExit() {
    if (exitSent) return;
    exitSent = true;
    send(
      withGeo({
        type: "exit",
        token: cfg.token || "",
        session: sessionId,
        url: location.pathname,
        title: document.title,
        duration_s: Math.round((Date.now() - start) / 1000),
        max_scroll: maxScroll,
        ts: nowISO()
      }),
      true
    );
  }

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") sendExit();
  });
  window.addEventListener("pagehide", sendExit);

  trackPageview();
})();
