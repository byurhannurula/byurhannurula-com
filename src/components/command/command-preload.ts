/** Fetch the command menu code ahead of the click, for example on hover. */
export function preloadCommandMenu() {
  // The same module that `next/dynamic` loads in command-palette.tsx.
  void import('./command-dialog-body');
}
