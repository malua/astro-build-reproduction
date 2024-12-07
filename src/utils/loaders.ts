import {
  getCollection,
  getEntry,
  type CollectionEntry,
  type CollectionKey,
} from "astro:content";

export type CollectionEntryWithAlternateLanguage<Key extends CollectionKey> =
  CollectionEntry<Key> & { alternateLanguage: CollectionEntry<Key> };

const filterByLang = (filePath: string, lang: string) => {
  return filePath.includes(`/${lang}/`);
};

const filterByPublished = (published: boolean) => {
  return import.meta.env.PROD
    ? published === true || published === undefined || published === null
    : true;
};

export const getSingleLocalizedDocument = async <Key extends CollectionKey>(
  collection: Key,
  lang: string,
): Promise<CollectionEntry<Key>> => {
  const contentEntries = await getCollection(
    collection,
    ({ filePath, data }) => {
      return filterByLang(filePath, lang) && filterByPublished(data.published);
    },
  );
  return contentEntries.length > 0 ? contentEntries[0] : null;
};

export const getLocalizedCollection = async <Key extends CollectionKey>(
  collection: Key,
  lang: string,
): Promise<CollectionEntry<Key>[]> => {
  const contentEntries = await getCollection(
    collection,
    ({ filePath, data }) => {
      return filterByLang(filePath, lang) && filterByPublished(data.published);
    },
  );

  for await (const entry of contentEntries) {
    if (entry.data?.alternateLanguage) {
      const alternateLanguage = await getEntry(entry.data.alternateLanguage);
      (entry as CollectionEntryWithAlternateLanguage<Key>).alternateLanguage =
        alternateLanguage;
    } else {
      continue;
    }
  }

  return contentEntries;
};

export const getAlternateLanguge = async <Key extends CollectionKey>(
  entry: CollectionEntry<Key>,
) => {
  const alternateLanguage = await getEntry<Key, string & {}>(
    entry.data.alternateLanguage,
  );
  return alternateLanguage;
};

export const getLocalizedPaths = async <Key extends CollectionKey>(
  collection: Key,
  lang: string,
) => {
  const entries = await getLocalizedCollection<Key>(collection, lang);
  const paths = entries.map((entry) => {
    const postLang = entry.filePath.includes(`/${lang}/`)
      ? lang
      : lang === "de"
        ? "en"
        : "de";

    return {
      params: {
        lang: postLang,
        slugPrefix: entry.data.slugPrefix,
        slug: entry.id,
      },
      props: { entry },
    };
  });
  return paths;
};
