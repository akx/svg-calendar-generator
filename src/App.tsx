import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import "./styles.css";
import * as dfn from "date-fns";
import SVGCalendar from "./SVGCalendar";
import { useTweaks } from "use-tweaks";
import { settingsTweakSchema } from "./calendar/settings";

export default function App() {
  const settings = useTweaks(settingsTweakSchema);
  const [date, setDate] = React.useState(() => new Date());
  const el = <SVGCalendar date={date} settings={settings} />;
  return (
    <div className="App">
      <input
        type="date"
        value={dfn.formatISO(date, { representation: "date" })}
        onChange={(e) => setDate(dfn.parseISO(e.target.value))}
      />
      <div style={{ maxWidth: "800px" }}>{el}</div>
      <textarea
        value={
          `<?xml version="1.0" encoding="UTF-8" ?>\n` +
          ReactDOMServer.renderToStaticMarkup(el)
        }
        cols={80}
        rows={16}
      />
    </div>
  );
}
