"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { locales, messages, type Locale } from "@/lib/i18n/messages";

type TranslateValues = Record<string, number | string>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, values?: TranslateValues) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "cabinet-admin-locale";

function getMessage(locale: Locale, key: string) {
  const keys = key.split(".");
  let current: unknown = messages[locale];

  for (const segment of keys) {
    if (!current || typeof current !== "object" || !(segment in current)) {
      return key;
    }

    current = (current as Record<string, unknown>)[segment];
  }

  return typeof current === "string" ? current : key;
}

function interpolate(template: string, values?: TranslateValues) {
  if (!values) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, token: string) => String(values[token] ?? ""));
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") {
      return "fr";
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && locales.includes(stored as Locale) ? (stored as Locale) : "fr";
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (nextLocale: Locale) => {
    setLocaleState(nextLocale);
    window.localStorage.setItem(STORAGE_KEY, nextLocale);
    document.documentElement.lang = nextLocale;
  };

  const t = (key: string, values?: TranslateValues) =>
    interpolate(getMessage(locale, key), values);

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}
