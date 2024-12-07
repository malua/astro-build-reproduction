import type { CollectionEntry, CollectionKey } from "astro:content";

export type CollectionData<C extends CollectionKey> =
  CollectionEntry<C>["data"];
