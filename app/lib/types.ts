import type { loader as commentsLoader } from "~/routes/comments";
import type { loader as listLoader } from "~/routes/list";

export type Comment = Awaited<ReturnType<typeof commentsLoader>>["comments"][number];

export type Task = Awaited<ReturnType<typeof listLoader>>["tasks"][number];