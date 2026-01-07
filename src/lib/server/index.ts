// Server-only utilities that use Node.js fs module
// These can ONLY be imported in Server Components, API routes, or generateStaticParams
// Never import these in client components or barrel files that client components use

export * from "./posts";
export * from "./shorts";
