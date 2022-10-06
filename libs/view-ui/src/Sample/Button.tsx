import { ComponentPropsWithRef, FC } from 'react';

interface Props extends ComponentPropsWithRef<'div'> {
  size?: 'small' | 'default' | 'large';
  variant?: 'default' | 'primary' | 'danger' | 'secondary';
  icon?: boolean;
}

type VariantProperties = {
  [property: string]: unknown;
} | null;

const serializeProperties = (variantProperties: VariantProperties) => {
  if (!variantProperties) {
    return '';
  }

  const sortedProperties = Object.entries(variantProperties).sort(
    ([aKey], [bKey]) => {
      return aKey.localeCompare(bKey);
    }
  );

  return sortedProperties.reduce(
    (str, [currKey, currVal]) =>
      `${str.toLowerCase()}--${currKey.toLowerCase()}-${String(
        currVal
      ).toLowerCase()}`,
    ''
  );
};

const Button: FC<Props> = (props: Props) => {
  const {
    children,
    size = 'default',
    variant = 'default',
    icon = false,
    ...rest
  } = props;
  console.log(serializeProperties({ size, variant, icon }));
  return <div {...rest}>{children}</div>;
};

export default Button;
export type { Props as ButtonProps };
