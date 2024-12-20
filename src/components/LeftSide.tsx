import { Fragment } from "react/jsx-runtime";
import { TCheck, TItem, TProps } from "../App";
import { ChevronIcon } from "../icons";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useRef } from "react";

const LeftSide = ({ state, setState, checked, setChecked }: TProps & { checked: TCheck; setChecked: Dispatch<SetStateAction<TCheck>> }) => {
  const submitHandler = () => {
    console.log(checked);
  };

  return (
    <div className="p-2">
      <button onClick={submitHandler} className="w-full bg-slate-800 text-white py-2 text-lg rounded-xl">
        Add
      </button>
      <div className="space-y-2 mt-4">
        {Object.entries(state.left).map((item) => (
          <GroupData setChecked={setChecked} checked={checked} key={item[0]} item={item} />
        ))}
      </div>
    </div>
  );
};

export default LeftSide;

const GroupData = ({ item, checked, setChecked }: { item: [string, TItem[]]; checked: TCheck; setChecked: Dispatch<SetStateAction<TCheck>> }) => {
  const childBoxRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLSpanElement>(null);

  const checkHandler = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    setChecked((prev) => ({ ...prev, left: { ...prev.left, [id]: e.target.checked } }));
  };

  const checkAllHandler = (e: ChangeEvent<HTMLInputElement>, item: TItem[]) => {
    const leftSide: { [key: number]: boolean } = {};
    for (let i = 0; i < item.length; i++) {
      leftSide[item[i].uniqueId] = e.target.checked;
    }
    setChecked((prev) => ({ ...prev, left: { ...prev.left, ...leftSide } }));
  };

  const isAllChecked = useCallback(
    (item: TItem[]) => {
      const isCheckAll = [];
      for (let i = 0; i < item.length; i++) {
        isCheckAll.push(checked.left[item[i].uniqueId]);
      }
      return isCheckAll.every((item) => !!item);
    },
    [checked.left]
  );

  return (
    <>
      <div className="bg-gray-300 p-4 rounded-xl flex justify-between items-center">
        <p>{item[0]}</p>
        <p>quantity : {item[1].length}</p>
        <div className="flex justify-center gap-2">
          <input checked={isAllChecked(item[1])} onChange={(e) => checkAllHandler(e, item[1])} type="checkbox" />
          <span
            ref={chevronRef}
            className="cursor-pointer"
            onClick={() => {
              childBoxRef.current?.classList.toggle("!h-full");
              chevronRef.current?.classList.toggle("rotate-180");
            }}
          >
            <ChevronIcon />
          </span>
        </div>
      </div>
      <div ref={childBoxRef} className="h-0 overflow-hidden space-y-1">
        {item[1].map((data) => (
          <div key={data.uniqueId} className="flex justify-between items-center px-4 py-2 rounded-xl bg-gray-400">
            <p>#{data.uniqueId}</p>
            <p>{data.title}</p>
            <input checked={checked.left[data.uniqueId]} defaultChecked={false} type="checkbox" onChange={(e) => checkHandler(e, data.uniqueId)} />
          </div>
        ))}
      </div>
    </>
  );
};
