const components = require('./svg-icons');

const icons: Record<string, any> = {};
Object.entries(components).forEach((file) => {
  const key = file[0].toLowerCase();
  const value = file[1];
  icons[key] = value;
});

interface IconType {
  icon: string;
  className?: string;
  width?: string;
  height?: string;
  stroke?: string;
}

export function Icon({ icon, ...props }: IconType) {
  const iconName = icon?.toLowerCase();

  if (icons[iconName]) {
    const Comp = icons[iconName];
    return <Comp {...props} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}
