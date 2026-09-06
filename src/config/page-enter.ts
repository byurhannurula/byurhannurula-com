/**
 * The staggered entrance, and when it is allowed to run.
 *
 * Only on a real page load. Moving between routes inside the site should feel
 * like the same page changing, not like arriving somewhere new every time, so
 * `data-first-load` is set before first paint and taken off once the entrance
 * has played. Everything after that navigates instantly.
 */

/** Longest delay plus the duration, from globals.css. Keep the two in step. */
const ENTRANCE_MS = 8 * 55 + 300;
/** Slack for a slow frame, so the attribute is never pulled mid-animation. */
const CLEAR_AFTER_MS = ENTRANCE_MS + 260;

/**
 * Blocking script for the document head.
 *
 * The clear is anchored to the first painted frame rather than to parse time:
 * the animation starts when the page paints, and on a slow connection a plain
 * timeout from here would expire before it ever began.
 */
export const PAGE_ENTER_SCRIPT = `(function(){try{
var d=document.documentElement;d.setAttribute("data-first-load","");
requestAnimationFrame(function(){requestAnimationFrame(function(){
setTimeout(function(){d.removeAttribute("data-first-load");},${CLEAR_AFTER_MS});
});});
}catch(e){}})();`;
