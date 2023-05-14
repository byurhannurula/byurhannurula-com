import { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/utils';
import { Icon } from './icon';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'clear';
  fullWidth?: boolean;
  loading?: boolean;
  small?: boolean;
  icon?: string;
  iconOnly?: boolean;
  iconColor?: string;
  iconSize?: string;
  onClick?: () => void;
}

export function Button({
  variant = 'clear',
  small = false,
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = '',
  iconOnly = false,
  iconColor = 'currentColor',
  className = '',
  children,
  ...props
}: IButton) {
  const styleClasses = cn(
    'btn',
    small && 'py-1 px-3',
    fullWidth && 'w-full',
    (icon !== '' || loading) && !iconOnly && '[&_svg]:mr-2.5',
    iconOnly && 'py-2 px-3 [&_svg]:w-5 [&_svg]:h-5 [&_svg]:mr-0',
    variant === 'clear' && 'bg-transparent text-zinc-700 hover:bg-zinc-200',
    variant === 'outline' &&
      'bg-transparent text-zinc-600 border border-zinc-400 hover:text-zinc-900 hover:border-zinc-700',
    variant === 'primary' && 'text-zinc-600 hover:text-zinc-900',
    className || ''
  );

  return (
    <button {...props} disabled={disabled || loading} className={styleClasses}>
      {loading && <Icon icon="loader" stroke={iconColor} />}
      {!loading && icon && <Icon icon={icon} stroke={iconColor} />}
      {!iconOnly && children}
    </button>
  );
}
