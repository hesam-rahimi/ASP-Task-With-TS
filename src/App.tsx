import "./App.css";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import { data } from "./data";

type TItem = {
  id: string;
  title: string;
  created: string;
  uniqueId: number;
};

function App() {
  const sorted = data.reduce((prev: { [key: string]: TItem[] }, curr) => {
    if (prev[curr.id]) prev[curr.id] = [...prev[curr.id], curr];
    else prev[curr.id] = [curr];

    return prev;
  }, {});

  return (
    <div className="bg-slate-500 w-full flex min-h-dvh [&>*]:bg-white p-5 gap-4 [&>*]:flex-1 [&>*]:rounded-lg">
      <LeftSide />
      <RightSide />
    </div>
  );
}

export default App;
