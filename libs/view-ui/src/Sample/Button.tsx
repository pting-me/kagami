import { ComponentPropsWithRef, FC } from 'react';

interface Props extends ComponentPropsWithRef<'div'> {
  size?: 'small' | 'default' | 'large';
  variant?: 'default' | 'primary' | 'danger' | 'secondary';
  icon?: boolean;
}

const Button: FC<Props> = (props: Props) => {
  const {
    children,
    size = 'default',
    variant = 'default',
    icon = false,
    ...rest
  } = props;
  return <div {...rest}>{children}</div>;
};

export default Button;
export type { Props as ButtonProps };
