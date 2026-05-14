import { useState } from "react";

export default function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopied(true);

      // Reset after 2 sec
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    copied,
    copy,
  };
}
