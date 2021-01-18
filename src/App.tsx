import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import "./styles.css";
import * as dfn from "date-fns";
import SVGCalendar from "./SVGCalendar";
import { useTweaks } from "use-tweaks";

export default function App() {
  const props = useTweaks({
    boxMargin: 5,
    boxWidth: 25,
    boxHeight: 25,
    boxStrokeWidth: 1,
    textXAdj: 0,
    textYAdj: 0,
    fontSize: 12,
  });
  const [date, setDate] = React.useState(() => new Date());
  const el = <SVGCalendar date={date} {...props} />;
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
