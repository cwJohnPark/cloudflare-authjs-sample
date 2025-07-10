import { Dictionary } from "./types";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  ko: () => import("./dictionaries/ko.json").then((module) => module.default),
  ja: () => import("./dictionaries/ja.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  zh: () => import("./dictionaries/zh.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: keyof typeof dictionaries
): Promise<Dictionary> => dictionaries[locale]?.() ?? dictionaries.en();
