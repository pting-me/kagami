import { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
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
  } = props;
  return <div>{children}</div>;
};

export default Button;
export type { Props as ButtonProps };
