import { useState } from "react";

export default function useCopyToClipboard() {
  // Store the copied id/text instead of just true/false
  const [copiedId, setCopiedId] = useState(null);

  const copy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedId(id);

      // Reset after 2 sec
      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  // isCopied — checks if a specific id was the one copied
  const isCopied = (id) => copiedId === id;

  return {
    copy,
    isCopied,
  };
}
