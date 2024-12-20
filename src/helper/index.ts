import { TItem } from "../App";

export const grouping = (data: TItem[] | { [key: string]: TItem }) => {
  return (Array.isArray(data) ? data : Object.values(data)).reduce((prev: { [key: string]: TItem[] }, curr) => {
    if (prev[curr.id]) prev[curr.id] = [...prev[curr.id], curr];
    else prev[curr.id] = [curr];
    return prev;
  }, {});
};

export const groupByUniqueId = (data: { [key: string]: TItem[] }) => {
  return Object.values(data).reduce((prev: { [key: string]: TItem }, curr) => {
    curr.forEach((item) => {
      prev[item.uniqueId] = item;
    });
    return prev;
  }, {});
};
