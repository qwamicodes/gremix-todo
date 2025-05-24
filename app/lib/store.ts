import { atom } from "jotai";
import type { Task } from "./types";

export const hoveredTask = atom<Task | undefined>(undefined);
