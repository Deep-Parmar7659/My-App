import { useEffect, useRef } from "react";

export default function LoadMoreTrigger({
  onLoadMore,
  hasNextPage,
  isFetching,
}) {
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && hasNextPage && !isFetching) {
          onLoadMore();
        }
      },
      {
        threshold: 1,
      },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(triggerRef.current);
      }
    };
  }, [hasNextPage, isFetching, onLoadMore]);

  return <div ref={triggerRef} className="h-10" />;
}
