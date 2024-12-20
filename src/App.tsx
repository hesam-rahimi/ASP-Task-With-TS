import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import "./App.css";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import { data } from "./data";

type TState = {
  left: {
    [key: string]: TItem[];
  };
  right: {
    [key: string]: TItem[];
  };
};

export type TProps = { state: TState; setState: Dispatch<SetStateAction<TState>> };

export type TCheck = { left: { [key: number]: boolean }; right: { [key: number]: boolean } };

export type TItem = {
  id: string;
  title: string;
  created: string;
  uniqueId: number;
};

const sorted = data.reduce((prev: { [key: string]: TItem[] }, curr) => {
  if (prev[curr.id]) prev[curr.id] = [...prev[curr.id], curr];
  else prev[curr.id] = [curr];

  return prev;
}, {});

function App() {
  const [state, setState] = useState<TState>({ left: sorted, right: {} });
  const [checked, setChecked] = useState<TCheck>({ left: {}, right: {} });

  useEffect(() => {
    console.log(checked);
  }, [checked]);

  return (
    <div className="bg-slate-500 w-full flex min-h-dvh [&>*]:bg-white p-5 gap-4 [&>*]:flex-1 [&>*]:rounded-lg">
      <LeftSide setChecked={setChecked} checked={checked} state={state} setState={setState} />
      <RightSide setChecked={setChecked} checked={checked} state={state} setState={setState} />
    </div>
  );
}

export default App;
