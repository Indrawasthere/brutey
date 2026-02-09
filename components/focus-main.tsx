"use client";

import { useEffect } from "react";

export default function FocusMain() {
  useEffect(() => {
    function handleFirstTab(e: KeyboardEvent) {
      if (e.key === "Tab") {
        try {
          document.documentElement.classList.add("user-is-tabbing");
        } catch (e) {}
        window.removeEventListener("keydown", handleFirstTab);
        window.addEventListener("mousedown", handleMouseDownOnce);
      }
    }

    function handleMouseDownOnce() {
      try {
        document.documentElement.classList.remove("user-is-tabbing");
      } catch (e) {}
      window.removeEventListener("mousedown", handleMouseDownOnce);
      window.addEventListener("keydown", handleFirstTab);
    }

    window.addEventListener("keydown", handleFirstTab);

    try {
      if (!location.hash) {
        const main = document.getElementById("main");
        if (main && document.activeElement === document.body) {
          setTimeout(() => {
            try {
              (main as HTMLElement).focus();
              document.documentElement.classList.add("show-main-focus");
              setTimeout(() => {
                document.documentElement.classList.remove("show-main-focus");
              }, 2000);
            } catch (e) {}
          }, 120);
        }
      }
    } catch (e) {}

    return () => {
      window.removeEventListener("keydown", handleFirstTab);
      window.removeEventListener("mousedown", handleMouseDownOnce);
    };
  }, []);

  return null;
}
