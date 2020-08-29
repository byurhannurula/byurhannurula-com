import React from 'react'

export const SunIcon = ({ width = 24, height = 24, ...restProps }) => (
  <svg
    width={width}
    height={height}
    className="icon"
    {...restProps}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

export const MoonIcon = ({ width = 24, height = 24, ...restProps }) => (
  <svg
    width={width}
    height={height}
    className="icon"
    {...restProps}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      strokeWidth="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
)
