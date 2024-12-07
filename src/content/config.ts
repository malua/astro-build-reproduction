import { z, defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/posts",
  }),
  schema: z.object({
    title: z.string(),
    slugPrefix: z.string(),
    tags: z.array(z.string()),
    category: reference("categories"),
    author: z.string(),
    description: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        // positionx: z.string().optional(),
        // positiony: z.string().optional(),
      })
      .optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    alternateLanguage: reference("posts"),
    published: z.boolean(),
  }),
});

const categories = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/categories",
  }),
  schema: z.object({
    title: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        // positionx: z.string().optional(),
        // positiony: z.string().optional(),
      })
      .optional(),
    alternateLanguage: reference("categories"),
  }),
});

const about = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/about",
  }),
  schema: z.object({
    title: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        // positionx: z.string().optional(),
        // positiony: z.string().optional(),
      })
      .optional(),
  }),
});

const home = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/home",
  }),
  schema: z.object({
    title: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        // positionx: z.string().optional(),
        // positiony: z.string().optional(),
      })
      .optional(),
    leadIn: z.string(),
  }),
});

const notFound = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/notfound",
  }),
  schema: z.object({
    title: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
        // positionx: z.string().optional(),
        // positiony: z.string().optional(),
      })
      .optional(),
  }),
});

const settings = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/settings",
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  posts,
  categories,
  about,
  home,
  notFound,
  settings,
};
