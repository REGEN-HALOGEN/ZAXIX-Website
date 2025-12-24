"use client";

import * as React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type StartupLoaderProps = {
  minDurationMs?: number;
};

export default function StartupLoader({ minDurationMs = 1800 }: StartupLoaderProps) {
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const delay = reduced ? 0 : Math.max(0, minDurationMs - elapsed);
      window.setTimeout(() => setVisible(false), delay);
    };

    if (document.readyState === "complete") {
      finish();
      return;
    }

    window.addEventListener("load", finish, { once: true });
    return () => window.removeEventListener("load", finish);
  }, [minDurationMs]);

  if (!visible) return null;

  return (
    <div className="zax-startup-loader" role="status" aria-label="Loading">
      <div className="zax-startup-loader__panel">
        <div className="zax-tube" aria-hidden="true">
          <DotLottieReact
            src="/lottie/lab-blue.lottie"
            autoplay
            loop
            className="zax-tube__svg"
          />
        </div>

        <div className="zax-startup-loader__text">
          <p className="zax-startup-loader__brand">Z AXIS</p>
          <p className="zax-startup-loader__sub">Preparing systems…</p>
        </div>
      </div>
    </div>
  );
}
