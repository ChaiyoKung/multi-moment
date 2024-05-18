"use client";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from "./list";
import ListItem from "./list-item";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence } from "framer-motion";
import { useLocalStorage } from "@uidotdev/usehooks";
import { LocalStorageKey } from "../../constants";
import { useState } from "react";

export default function ListSection() {
  const [listIds, setListIds] = useLocalStorage<Array<string>>(LocalStorageKey.ListIds, []);
  const [autoFocus, setAutoFocus] = useState<boolean>(false);

  const addList = () => {
    const id = uuidv4();
    setListIds((prev) => [id, ...prev]);
    setAutoFocus(true);
  };

  const removeListById = (id: string) => {
    setListIds((prev) => prev.filter((i) => i !== id));
    localStorage.removeItem(LocalStorageKey.ListTitleById(id));
    localStorage.removeItem(LocalStorageKey.ListTimeById(id));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          className="bg-orange-500 text-orange-50 flex items-center gap-2 px-3 py-2 rounded-2xl font-medium"
          onClick={addList}
        >
          <span>
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
          Add
        </button>
      </div>
      {listIds.length === 0 ? (
        <div className="flex justify-center items-center border border-solid border-gray-700 text-gray-500 rounded-xl  min-h-32">
          No moment, Press &quot;add&quot; button.
        </div>
      ) : (
        <List values={listIds} onReorder={setListIds}>
          <AnimatePresence>
            {listIds.map((id) => (
              <ListItem key={id} id={id} value={id} onClickRemove={() => removeListById(id)} autoFocus={autoFocus} />
            ))}
          </AnimatePresence>
        </List>
      )}
    </div>
  );
}
