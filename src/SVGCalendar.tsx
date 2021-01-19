import { Settings } from "./calendar/settings";
import generateSVGCalendar from "./calendar/generator";

export default function SVGCalendar({
  date,
  settings,
  svgProps,
}: {
  date: Date;
  settings: Partial<Settings>;
  svgProps?: Partial<React.SVGProps<SVGSVGElement>>;
}) {
  const svgEl = generateSVGCalendar(date, settings);
  Object.assign(svgEl.props, svgProps);
  return svgEl;
}
