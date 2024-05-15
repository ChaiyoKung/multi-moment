"use client";
import { faPause, faPlay, faSort, faStop, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { formatDuration } from "../../libs/dayjs";
import clsx from "clsx/lite";
import { Reorder, useDragControls } from "framer-motion";

export interface ListItemProps<V> {
  value: V;
  onClickRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function ListItem<V>({ value, onClickRemove: onClickDelete }: ListItemProps<V>) {
  const [title, setTitle] = useState<string>("");
  const [time, setTime] = useState<number>(0);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const timer = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);
  const controls = useDragControls();

  const formattedTime = useMemo(() => formatDuration(time), [time]);

  const toggleIsTracking = () => {
    setIsTracking((prev) => !prev);
  };

  const handleClickStop = () => {
    setTime(0);
    setIsTracking(false);
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (isTracking) {
      timer.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [isTracking]);

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
              autoFocus
              value={title}
              onChange={handleChangeTitle}
              onKeyDown={handlePressEnter}
            />
          </div>
          <p className="text-2xl text-blue-300">{formattedTime}</p>
        </div>
        <button
          className={clsx(
            "flex justify-center items-center text-xl aspect-square w-11 h-11 rounded-full",
            isTracking
              ? "border border-solid border-blue-400 text-blue-400 hover:bg-blue-100 hover:bg-opacity-10"
              : "text-blue-800 bg-blue-400 hover:bg-blue-500"
          )}
          onClick={toggleIsTracking}
        >
          <FontAwesomeIcon icon={isTracking ? faPause : faPlay} />
        </button>
        <button
          className={
            "flex justify-center items-center text-sm border border-solid border-red-400 text-red-400 hover:bg-red-100 hover:bg-opacity-10 aspect-square w-9 h-9 rounded-full"
          }
          onClick={handleClickStop}
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
