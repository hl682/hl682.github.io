"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Props = {
  label: string;
  kicker?: string;
  children: React.ReactNode;
};

export function Disclosure({ label, kicker, children }: Props) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelId = useId();

  return (
    <div className="disclosure">
      <button
        type="button"
        className="disclosure-button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>
          {kicker ? <span className="ledger">{kicker}</span> : null}
          <span className="disclosure-label">{label}</span>
        </span>
        <span className="mark" data-open={open} aria-hidden="true" />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            className="disclosure-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="disclosure-inner prose">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
