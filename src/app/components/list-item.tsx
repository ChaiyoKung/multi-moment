"use client";
import { faPause, faPlay, faSort, faStop, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef } from "react";
import { formatDuration } from "../../libs/dayjs";
import clsx from "clsx/lite";
import { Reorder, useDragControls } from "framer-motion";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LocalStorageKey } from "../../constants";
import useTimeTracking from "../../hooks/use-time-tracking";

export interface ListItemProps<V> {
  id: string;
  value: V;
  onClickRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  autoFocus?: boolean;
}

export default function ListItem<V>({ id, value, onClickRemove: onClickDelete, autoFocus }: ListItemProps<V>) {
  const [title, setTitle] = useLocalStorage<string>(LocalStorageKey.ListTitleById(id), "");
  const { time, setTime, isTracking, start, stop, reset } = useTimeTracking();
  const inputRef = useRef<HTMLInputElement>(null);
  const controls = useDragControls();
  const isFirstLoad = useRef<boolean>(true);

  const formattedTime = useMemo(() => formatDuration(time, "ms"), [time]);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (!isFirstLoad.current) {
      localStorage.setItem(LocalStorageKey.ListTimeById(id), String(time));
    }
  }, [id, time]);

  useEffect(() => {
    if (isFirstLoad.current) {
      const time = localStorage.getItem(LocalStorageKey.ListTimeById(id));
      if (time !== null) setTime(Number(time));
      isFirstLoad.current = false;
    }
  }, [id, setTime]);

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <Reorder.Item
      value={value}
      dragListener={false}
      dragControls={controls}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.125 }}
      className={clsx(
        "relative bg-gray-700 border border-solid rounded-2xl flex select-none",
        isTracking ? "border-blue-400" : "border-gray-600"
      )}
    >
      <div
        className="text-gray-500 cursor-grab active:cursor-grabbing py-4 flex justify-center items-center rounded-tl-2xl rounded-bl-2xl p-4"
        onPointerDown={(e) => controls.start(e)}
      >
        <FontAwesomeIcon icon={faSort} />
      </div>
      <div className="flex-1 flex items-center gap-4 p-4 pl-0">
        <div className="flex flex-col flex-1 gap-2">
          <div className="">
            <input
              ref={inputRef}
              type="text"
              className="text-2xl w-full text-gray-300 bg-transparent placeholder:text-gray-500 focus:outline-none border-b border-b-gray-500 focus:border-b-blue-400"
              placeholder="Title..."
              autoFocus={autoFocus}
              value={title}
              onChange={handleChangeTitle}
              onKeyDown={handlePressEnter}
            />
          </div>
          {(isTracking || time > 0) && (
            <p className={clsx("text-2xl", isTracking || time > 0 ? "text-blue-300" : "text-gray-400")}>
              {formattedTime}
            </p>
          )}
        </div>
        <button
          className={clsx(
            "flex justify-center items-center text-xl aspect-square w-11 h-11 rounded-full",
            isTracking
              ? "border border-solid border-blue-400 text-blue-400 hover:bg-blue-100 hover:bg-opacity-10"
              : "text-blue-800 bg-blue-400 hover:bg-blue-500"
          )}
          onClick={isTracking ? stop : start}
        >
          <FontAwesomeIcon icon={isTracking ? faPause : faPlay} />
        </button>
        <button
          className={
            "flex justify-center items-center text-sm border border-solid border-red-400 text-red-400 hover:bg-red-100 hover:bg-opacity-10 aspect-square w-9 h-9 rounded-full"
          }
          onClick={reset}
        >
          <FontAwesomeIcon icon={faStop} />
        </button>
      </div>
      <button
        className="flex justify-center items-center text-sm text-gray-800 hover:bg-gray-600 rounded-tr-2xl rounded-br-2xl p-4 border-l border-dashed border-l-gray-600"
        onClick={onClickDelete}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </Reorder.Item>
  );
}
