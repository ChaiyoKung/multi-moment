import { Reorder } from "framer-motion";
import { ReactNode } from "react";

export interface ListProps<V> {
  values: Array<V>;
  onReorder: (newOrder: Array<V>) => void;
  children?: ReactNode;
}

export default function List<V>({ values, onReorder, children }: ListProps<V>) {
  return (
    <Reorder.Group values={values} onReorder={onReorder} className="flex flex-col gap-4">
      {children}
    </Reorder.Group>
  );
}
