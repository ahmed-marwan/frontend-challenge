import { useEffect, useRef, useState } from 'react';

function useOnScreen(options: { threshold: number }) {
  // Keep track of the visibility of the img container we're watching
  const [visible, setVisible] = useState(false);
  // A reference to point to the img container
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Creating a new intersection observer instance
    const observer = new IntersectionObserver(([entry]) => {
      // Requesting ONLY images whose container is on the screen
      if (!entry.isIntersecting) return;

      // Setting visibility to true when img container is visible on screen
      setVisible(entry.isIntersecting);
    }, options);

    // Ensuring that img container is being referenced before observing it
    if (ref.current) observer.observe(ref.current);

    let refValue = ref.current;

    return () => {
      if (refValue) observer.unobserve(refValue);
    };
  }, [options, ref]);

  return [ref, visible];
}

export default useOnScreen;
