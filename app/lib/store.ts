import type { Task } from "@prisma/client";
import { atom } from "jotai";

export const hoveredTask = atom<Task | undefined>(undefined);
