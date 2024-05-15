import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export function formatDuration(seconds: number) {
  const duration = dayjs.duration(seconds, "seconds");
  return duration.format("HH:mm:ss");
}
