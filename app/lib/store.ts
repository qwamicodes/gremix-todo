import type { Status } from "@prisma/client";
import { atom } from "jotai";
import type { Task } from "./types";

export const hoveredTask = atom<Task | undefined>(undefined);

export const assigneeAtom = atom<string | undefined>(undefined);
export const searchAtom = atom<string | undefined>(undefined);
export const filterStatusAtom = atom<Status | undefined>(undefined);
