/**
 * Private visitor-tracking backend for hl682.github.io
 * Deploy this as a Google Apps Script "Web app" (see analytics/SETUP.md).
 *
 * It receives beacons from assets/js/visitor-tracker.js, appends them to a
 * Google Sheet, and sends you a notification (email and/or Telegram) on each
 * new visit and each download click.
 */

// ======================= CONFIG =======================
// Leave SHEET_ID empty to use the spreadsheet this script is bound to.
var SHEET_ID = "";

// Email address to alert. Leave "" to disable email notifications.
var NOTIFY_EMAIL = "your-email@example.com";

// Optional Telegram push (recommended for high volume / no quota limits).
// Create a bot via @BotFather, get the token; get your chat id via @userinfobot.
var TELEGRAM_TOKEN = "";
var TELEGRAM_CHAT_ID = "";

// Optional shared secret. If set, must match visitor_tracking.token in _config.yml.
var SHARED_TOKEN = "";

// Which event types trigger a notification. Everything is always logged.
// Options: "pageview", "download". ("exit" duration events are logged, not alerted.)
var NOTIFY_ON = ["pageview", "download"];

// Send at most one "pageview" alert per session (avoids duplicate emails).
var DEDUPE_PAGEVIEW_PER_SESSION = true;
// ======================================================

function doPost(e) {
  var out = { ok: true };
  try {
    var data = JSON.parse(e.postData.contents);

    if (SHARED_TOKEN && data.token !== SHARED_TOKEN) {
      return json({ ok: false, error: "bad token" });
    }

    logToSheet(data);

    if (NOTIFY_ON.indexOf(data.type) !== -1) {
      if (data.type === "pageview" && DEDUPE_PAGEVIEW_PER_SESSION && seen(data.session)) {
        // already alerted for this session
      } else {
        notify(data);
      }
    }
  } catch (err) {
    out = { ok: false, error: String(err) };
  }
  return json(out);
}

function doGet() {
  return ContentService.createTextOutput("Visitor tracker is running.");
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function ss_() {
  return SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
}

function sheet_() {
  var ss = ss_();
  var sh = ss.getSheetByName("visits");
  if (!sh) {
    sh = ss.insertSheet("visits");
    sh.appendRow([
      "Time", "Type", "IP", "City", "Region", "Country", "ISP/Org",
      "Page", "Title", "Referrer", "Duration(s)", "MaxScroll%", "File",
      "Language", "Timezone", "Screen", "Viewport", "Session", "UserAgent"
    ]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function logToSheet(d) {
  sheet_().appendRow([
    new Date(),
    d.type || "",
    d.ip || "",
    d.city || "",
    d.region || "",
    d.country || "",
    d.org || "",
    d.url || "",
    d.title || "",
    d.referrer || "",
    d.duration_s || "",
    d.max_scroll || "",
    d.file || "",
    d.lang || "",
    d.tz || "",
    d.screen || "",
    d.viewport || "",
    d.session || "",
    d.ua || ""
  ]);
}

// Track which sessions already produced a pageview alert (per script run cache).
function seen(session) {
  if (!session) return false;
  var cache = CacheService.getScriptCache();
  var key = "seen_" + session;
  if (cache.get(key)) return true;
  cache.put(key, "1", 21600); // 6 hours
  return false;
}

function notify(d) {
  var loc = [d.city, d.region, d.country].filter(Boolean).join(", ") || "Unknown";
  var subject =
    d.type === "download"
      ? "Download: " + (d.file || "")
      : "New visitor: " + loc;

  var body = [
    "Type:      " + d.type,
    "Time:      " + new Date(),
    "IP:        " + (d.ip || ""),
    "Location:  " + loc,
    "ISP/Org:   " + (d.org || ""),
    "Page:      " + (d.url || "") + "   (" + (d.title || "") + ")",
    "Referrer:  " + (d.referrer || ""),
    d.file ? "File:      " + d.file : null,
    "Language:  " + (d.lang || "") + "   TZ: " + (d.tz || ""),
    "Screen:    " + (d.screen || "") + "   Viewport: " + (d.viewport || ""),
    "Session:   " + (d.session || ""),
    "UserAgent: " + (d.ua || "")
  ]
    .filter(function (x) { return x !== null; })
    .join("\n");

  if (NOTIFY_EMAIL) {
    try {
      MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    } catch (err) {
      /* MailApp daily quota may be exceeded; ignore */
    }
  }

  if (TELEGRAM_TOKEN && TELEGRAM_CHAT_ID) {
    try {
      UrlFetchApp.fetch(
        "https://api.telegram.org/bot" + TELEGRAM_TOKEN + "/sendMessage",
        {
          method: "post",
          payload: { chat_id: TELEGRAM_CHAT_ID, text: subject + "\n\n" + body },
          muteHttpExceptions: true
        }
      );
    } catch (err) {
      /* ignore */
    }
  }
}
