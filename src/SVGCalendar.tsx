import * as React from "react";
import * as dfn from "date-fns";

function SVGCalendar({
  date,
  boxMargin = 5,
  boxWidth = 25,
  boxHeight = boxWidth,
  textXAdj = 0,
  textYAdj = 0,
  fontSize = 12,
  boxStrokeWidth = 1,
}: {
  date: Date;
  boxMargin?: number;
  boxWidth?: number;
  boxHeight?: number;
  textXAdj?: number;
  textYAdj?: number;
  fontSize?: number;
  boxStrokeWidth?: number;
}) {
  const textXOff = boxWidth / 2 + textXAdj;
  const textYOff = boxHeight / 2 + textYAdj;
  const boxes: React.ReactNode[] = [];
  const headings: React.ReactNode[] = [];
  const firstOfMonth = dfn.startOfMonth(date);
  const fomWeekday = dfn.getISODay(firstOfMonth);
  const monthLength = dfn.getDaysInMonth(firstOfMonth);
  for (let i = 0; i < 7 * 5; i++) {
    const y = Math.floor(i / 7);
    const x = i % 7;
    const tx = x * (boxWidth + boxMargin);
    const ty = y * (boxHeight + boxMargin);
    const dayOfMonth = i + 2 - fomWeekday;
    const date = dfn.setDate(firstOfMonth, dayOfMonth);
    if (y === 0) {
      headings.push(
        <g transform={`translate(${tx} ${-boxMargin * 2})`} key={i}>
          <text x={textXOff} textAnchor="middle" fontSize={fontSize}>
            {dfn.format(date, "cccccc")}
          </text>
        </g>
      );
    }
    if (dayOfMonth > 0 && dayOfMonth <= monthLength) {
      boxes.push(
        <g transform={`translate(${tx} ${ty})`} key={i}>
          <rect
            width={boxWidth}
            height={boxHeight}
            fill="none"
            stroke="black"
            strokeWidth={boxStrokeWidth}
          />
          <text
            y={textYOff}
            x={textXOff}
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize={fontSize}
          >
            {dayOfMonth}
          </text>
        </g>
      );
    }
  }
  return (
    <svg viewBox="0 0 297 210">
      <g transform="translate(20 30)">
        {headings}
        {boxes}
      </g>
    </svg>
  );
}
export default SVGCalendar;
