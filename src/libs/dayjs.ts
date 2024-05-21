import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

/**
 * Formats a given time duration into "HH:mm:ss" format.
 *
 * @param time - The time duration to format.
 * @param [unit='seconds'] - The unit of the time duration (e.g., 'seconds', 'minutes', 'hours').
 * @returns The formatted time duration as "HH:mm:ss".
 */
export function formatDuration(time: number, unit: duration.DurationUnitType = "seconds") {
  const duration = dayjs.duration(time, unit);
  return duration.format("HH:mm:ss");
}
