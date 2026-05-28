import { useEffect, useRef } from "react";

export default function LoadMoreTrigger({
  onLoadMore,
  hasNextPage,
  isFetching,
}) {
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          onLoadMore();
        }
      },
      {
        threshold: 1,
      },
    );

    const currentRef = triggerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetching, onLoadMore]);

  return <div ref={triggerRef} className="h-10" />;
}
