"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  href: string;
  index: string;
  title: string;
  text: string;
  image: string;
  caption: string;
};

export function Door({ href, index, title, text, image, caption }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
      <Link href={href} className="door">
        <div className="plate-stage">
          <motion.img
            src={image}
            alt=""
            variants={{ rest: { scale: 1.03 }, hover: { scale: reduce ? 1.03 : 1.06 } }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="door-copy">
          <span className="ledger">{index}</span>
          <span className="display display-md">{title}</span>
          <span className="quiet">{text}</span>
          <span className="ledger">{caption}</span>
        </span>
      </Link>
    </motion.div>
  );
}
