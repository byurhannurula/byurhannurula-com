import {
  DEFAULT_OPTIONS,
  OPTION_KEYS,
  OPTIONS,
  OPTIONS_STORAGE_KEY,
} from '@/config/options';
import { MODE_START_HOUR } from '@/lib/light';

const valid = Object.fromEntries(
  OPTION_KEYS.map((key) => [key, OPTIONS[key].choices.map(([v]) => v)]),
);

/**
 * Blocking script for the document head. It sets the option attributes from
 * storage before first paint, so a saved choice never flashes the default.
 * Built from the registry: a classic script cannot import, and two copies of
 * the values would drift.
 */
const SCRIPT = `(function(){try{
var d=${JSON.stringify(DEFAULT_OPTIONS)},v=${JSON.stringify(valid)},s=${JSON.stringify(MODE_START_HOUR)};
var o={};try{o=JSON.parse(localStorage.getItem(${JSON.stringify(OPTIONS_STORAGE_KEY)})||"{}")||{}}catch(e){}
var r=document.documentElement;
for(var k in d){var x=v[k].indexOf(o[k])>-1?o[k]:d[k];if(k!=="light")r.setAttribute("data-"+k,x);else{
var m=x;if(x==="auto"){var h=new Date().getHours();m=(h>=s.night||h<s.morning)?"night":h>=s.evening?"evening":h>=s.day?"day":"morning"}
r.setAttribute("data-light",m);r.setAttribute("data-theme",m==="evening"||m==="night"?"dark":"light")}}
r.classList.add("js");
}catch(e){}})();`;

export function OptionsScript() {
  return (
    <script
      // oxlint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: SCRIPT }}
    />
  );
}

/** Attributes for `<html>` on the server: the defaults, in daylight. */
export const defaultHtmlAttributes: Record<string, string> = {
  ...Object.fromEntries(
    OPTION_KEYS.filter((key) => key !== 'light').map((key) => [
      `data-${key}`,
      DEFAULT_OPTIONS[key],
    ]),
  ),
  'data-light': 'day',
  'data-theme': 'light',
};
