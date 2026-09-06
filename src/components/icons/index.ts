/* No `export * from "./dev"`: that re-exported all 40 marks by name, and only
   TECH_LOGOS ever consumed them. Add one here if something needs it directly. */
export { TECH_LOGOS, type TechLogoName } from "./dev/tech-logos";
export * from "./social";
