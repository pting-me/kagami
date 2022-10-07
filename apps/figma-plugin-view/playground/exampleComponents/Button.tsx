import { CSSProperties, ComponentPropsWithRef, FC } from 'react';

interface BaseProps {
  /**
   * @default 'default'
   */
  size?: 'small' | 'default' | 'large';
  /**
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'danger' | 'secondary';
  /**
   * @default false
   */
  icon?: boolean;
  /**
   * @default 1
   */
  buttonId?: number;
}

type Props = BaseProps & ComponentPropsWithRef<'div'>;

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

const getStyles = (serialized: string): CSSProperties => {
  switch (serialized) {
    case '--icon-false--size-default--variant-default':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(242,242,242,1)',
        borderWidth: '0px 0px 0px 0px',
        borderColor: 'rgba(0,0,0,1);',
        borderStyle: 'solid',
        padding: '7px 12px 7px 12px',
      };
    case '--icon-false--size-default--variant-primary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(45,127,249,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'rgba(0,0,0,1);',
        borderStyle: 'solid',
        padding: '7px 12px 7px 12px',
      };
    case '--icon-false--size-default--variant-danger':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(239,48,97,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '7px 12px 7px 12px',
      };
    case '--icon-false--size-default--variant-secondary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: '',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '7px 12px 7px 12px',
      };
    case '--icon-true--size-default--variant-default':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(242,242,242,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '7px 12px 7px 12px',
      };
    case '--icon-true--size-default--variant-primary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(45,127,249,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '7px 12px 7px 12px',
      };
    case '--icon-true--size-default--variant-danger':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(239,48,97,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '7px 12px 7px 12px',
      };
    case '--icon-true--size-default--variant-secondary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: '',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '7px 12px 7px 12px',
      };
    case '--icon-false--size-small--variant-default':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(242,242,242,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '5px 10px 5px 10px',
      };
    case '--icon-false--size-small--variant-primary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(45,127,249,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '5px 10px 5px 10px',
      };
    case '--icon-false--size-small--variant-danger':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(239,48,97,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '5px 10px 5px 10px',
      };
    case '--icon-false--size-small--variant-secondary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: '',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '5px 10px 5px 10px',
      };
    case '--icon-true--size-small--variant-default':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(242,242,242,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '5px 10px 5px 10px',
      };
    case '--icon-true--size-small--variant-primary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(45,127,249,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '5px 10px 5px 10px',
      };
    case '--icon-true--size-small--variant-danger':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(239,48,97,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '5px 10px 5px 10px',
      };
    case '--icon-true--size-small--variant-secondary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: '',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '5px 10px 5px 10px',
      };
    case '--icon-false--size-large--variant-default':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(242,242,242,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '9px 14px 9px 14px',
      };
    case '--icon-false--size-large--variant-primary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(45,127,249,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '9px 14px 9px 14px',
      };
    case '--icon-false--size-large--variant-danger':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(239,48,97,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '9px 14px 9px 14px',
      };
    case '--icon-false--size-large--variant-secondary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: '',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '9px 14px 9px 14px',
      };
    case '--icon-true--size-large--variant-default':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(242,242,242,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '9px 14px 9px 14px',
      };
    case '--icon-true--size-large--variant-primary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(45,127,249,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '9px 14px 9px 14px',
      };
    case '--icon-true--size-large--variant-danger':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: 'rgba(239,48,97,1)',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '9px 14px 9px 14px',
      };
    case '--icon-true--size-large--variant-secondary':
      return {
        borderRadius: '3px 3px 3px 3px',
        backgroundColor: '',
        borderWidth: '1px 1px 1px 1px',
        borderColor: 'initial',
        borderStyle: 'none',
        padding: '9px 14px 9px 14px',
      };
    default:
      return {};
  }
};

const Button: FC<Props> = (props: Props) => {
  const {
    children,
    size = 'default',
    variant = 'default',
    icon = false,
    ...rest
  } = props;

  const serialized = serializeProperties({
    size,
    variant,
    icon,
  });

  return (
    <div style={getStyles(serialized)} {...rest}>
      {children}
    </div>
  );
};

export default Button;
export type { Props };
