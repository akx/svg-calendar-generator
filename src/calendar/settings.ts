import { Schema } from "use-tweaks/src/types";
import localeData, { knownLocales } from "./localeData";

export interface Settings {
  pageWidth: number;
  pageHeight: number;
  boxMargin: number;
  boxWidth: number;
  boxHeight: number;
  textXAdj: number;
  textYAdj: number;
  fontSize: number;
  boxStrokeWidth: number;
  locale: string;
  weekdaySize: "abbreviated" | "narrow" | "short" | "wide";
}

export const defaultSettings: Settings = {
  pageWidth: 297,
  pageHeight: 210,
  boxMargin: 5,
  boxWidth: 25,
  boxHeight: 25,
  textXAdj: 0,
  textYAdj: 0,
  fontSize: 12,
  boxStrokeWidth: 1,
  locale: "en",
  weekdaySize: "abbreviated",
};
export const settingsTweakSchema: Schema = {
  ...defaultSettings,
  weekdaySize: {
    input: "string",
    value: defaultSettings.weekdaySize,
    options: {
      abbreviated: "abbreviated",
      narrow: "narrow",
      short: "short",
      wide: "wide",
    },
  },
  locale: {
    input: "string",
    value: defaultSettings.locale,
    options: Object.fromEntries(
      Array.from(knownLocales).map((l) => [localeData[l].name, l])
    ),
  },
};
