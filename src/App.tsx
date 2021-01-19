import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import "./styles.css";
import { makeButton, makeFolder, useTweaks } from "use-tweaks";
import { Settings, settingsTweakSchema } from "./calendar/settings";
import generateSVGCalendar from "./calendar/generator";
import styled from "styled-components";
import { useCounter } from "react-use";

const FlipCard = styled.div({
  perspective: "100vmax",
  transformStyle: "preserve-3d",
  transformOrigin: "50% 50%",
  ".back, .front": {
    position: "absolute",
    left: "0px",
    top: "0px",
    backfaceVisibility: "hidden",
    transition: ".4s ease-in-out transform",
  },
});

export default function App() {
  const [flipped, { inc: flip }] = useCounter(0);
  const { year, month, ...inputSettings } = useTweaks({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    ...makeButton("Flip!", () => flip()),
    ...makeFolder("Layout", settingsTweakSchema),
  });
  const date = new Date(year, month - 1, 1);
  const { element: svgEl, effectiveSettings: settings } = generateSVGCalendar(
    date,
    (inputSettings as unknown) as Settings
  );
  const aspect = settings.pageWidth / settings.pageHeight;
  const width = 800;
  const height = Math.round(width / aspect);
  const cardProps = {
    width: `${width}px`,
    height: `${height}px`,
  };
  const displaySvgEl = React.cloneElement(svgEl, {
    ...svgEl.props,
    style: {
      background: "white",
      ...cardProps,
    },
  });
  console.log(flipped);
  return (
    <div className="App">
      <div
        style={{ position: "relative", left: "3em", top: "3em", ...cardProps }}
      >
        <FlipCard style={{ ...cardProps }}>
          <div
            className="front"
            style={{ transform: `rotateY(${flipped * 180}deg)` }}
          >
            {displaySvgEl}
          </div>
          <div
            className="back"
            style={{
              ...cardProps,
              transform: `rotateY(${(flipped + 1) * 180}deg)`,
              background: "purple",
              display: "flex",
            }}
          >
            <textarea
              value={
                `<?xml version="1.0" encoding="UTF-8" ?>\n` +
                ReactDOMServer.renderToStaticMarkup(svgEl)
              }
              style={{ flex: "1" }}
            />
          </div>
        </FlipCard>
      </div>
    </div>
  );
}
