import { useCallback, useEffect, useRef, useState } from "react";

export default function useTimeTracking() {
  const startTime = useRef<number>(0);
  const [time, setTime] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);

  const start = useCallback(() => {
    setIsTracking(true);
  }, []);

  const stop = useCallback(() => {
    setIsTracking(false);
  }, []);

  const reset = useCallback(() => {
    startTime.current = 0;
    setTime(0);
    setIsTracking(false);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined = undefined;
    if (isTracking) {
      startTime.current = Date.now() - time;
      // If there is a possibility that your logic could take longer to execute than the interval time,
      // it is recommended that you recursively call a named function using `setTimeout()`.
      // Ref: https://developer.mozilla.org/en-US/docs/Web/API/setInterval#ensure_that_execution_duration_is_shorter_than_interval_frequency
      (function loop() {
        timer = setTimeout(() => {
          setTime(Date.now() - startTime.current);
          loop();
        }, 1000);
      })();
    } else {
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isTracking, time]);

  return { time, setTime, isTracking, setIsTracking, start, stop, reset };
}
