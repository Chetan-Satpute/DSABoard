import { createContext } from "react";

type UseStateContext<T> = [T, (_: T) => void];

export const CodeContext = createContext<UseStateContext<string>>([
  "",
  () => {},
]);
