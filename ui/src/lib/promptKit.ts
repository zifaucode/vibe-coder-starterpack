import type { Node } from "../components/Blueprint";
import type { Category, PromptItem } from "./prompts";

/** Pembuat item perpustakaan. `use` = satu kalimat "cocok untuk apa", `bp` = kerangka berlabel. */
export const mk = (
  id: string,
  category: Exclude<Category, "All">,
  title: string,
  description: string,
  tags: string[],
  use: string,
  promptText: string,
  bp: Node,
): PromptItem => ({ id, category, title, description, tags, use, promptText, bp });
