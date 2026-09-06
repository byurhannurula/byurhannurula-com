/**
 * The dashed rules that draw the page: the column's two side lines, the
 * hairlines between rows, and the prose divider.
 *
 * They are on by default. Turning them off leaves the same layout as a plain
 * typographic column, which is a real second look at the site rather than a
 * degraded one, so it is worth a switch in the footer.
 */

export const RULES_KEY = "page-rules";

/**
 * Blocking script for the document head.
 *
 * The rules are painted by the first frame, so the stored preference has to
 * land before it. Read in an effect instead, the lines would appear and then
 * be taken away again in front of the reader.
 */
export const RULES_SCRIPT = `(function(){try{
if(localStorage.getItem(${JSON.stringify(RULES_KEY)})==="off"){
document.documentElement.setAttribute("data-rules","off");}
}catch(e){}})();`;
