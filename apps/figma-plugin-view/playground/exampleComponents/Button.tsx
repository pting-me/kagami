import { CSSProperties, ComponentPropsWithRef, FC, ReactNode } from 'react';

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

interface ComputedProps {
  style?: CSSProperties;
  children?: ReactNode;
}

const getProps = (variantProperties: VariantProperties): ComputedProps => {
  const serialized = serializeProperties(variantProperties);
  switch (serialized) {
    case '--icon-false--size-default--variant-default':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(242,242,242,1)',
          borderWidth: '0px 0px 0px 0px',
          borderColor: 'rgba(0,0,0,1);',
          borderStyle: 'solid',
          padding: '7px 12px 7px 12px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-default--variant-primary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(45,127,249,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'rgba(0,0,0,1);',
          borderStyle: 'solid',
          padding: '7px 12px 7px 12px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-default--variant-danger':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(239,48,97,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '7px 12px 7px 12px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-default--variant-secondary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: '',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '7px 12px 7px 12px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-default--variant-default':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(242,242,242,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '7px 12px 7px 12px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-default--variant-primary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(45,127,249,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '7px 12px 7px 12px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-default--variant-danger':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(239,48,97,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '7px 12px 7px 12px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-default--variant-secondary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: '',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '7px 12px 7px 12px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-small--variant-default':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(242,242,242,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '5px 10px 5px 10px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-small--variant-primary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(45,127,249,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '5px 10px 5px 10px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-small--variant-danger':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(239,48,97,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '5px 10px 5px 10px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-small--variant-secondary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: '',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '5px 10px 5px 10px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-small--variant-default':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(242,242,242,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '5px 10px 5px 10px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-small--variant-primary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(45,127,249,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '5px 10px 5px 10px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-small--variant-danger':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(239,48,97,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '5px 10px 5px 10px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-small--variant-secondary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: '',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '5px 10px 5px 10px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-large--variant-default':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(242,242,242,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '9px 14px 9px 14px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-large--variant-primary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(45,127,249,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '9px 14px 9px 14px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-large--variant-danger':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(239,48,97,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '9px 14px 9px 14px',
        },
        children: <div></div>,
      };
    case '--icon-false--size-large--variant-secondary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: '',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '9px 14px 9px 14px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-large--variant-default':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(242,242,242,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '9px 14px 9px 14px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-large--variant-primary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(45,127,249,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '9px 14px 9px 14px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-large--variant-danger':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: 'rgba(239,48,97,1)',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '9px 14px 9px 14px',
        },
        children: <div></div>,
      };
    case '--icon-true--size-large--variant-secondary':
      return {
        style: {
          borderRadius: '3px 3px 3px 3px',
          backgroundColor: '',
          borderWidth: '1px 1px 1px 1px',
          borderColor: 'initial',
          borderStyle: 'none',
          padding: '9px 14px 9px 14px',
        },
        children: <div></div>,
      };
    default:
      return {};
  }
};

const Button: FC<Props> = (props: Props) => {
  const {
    children: childrenOverride,
    size = 'default',
    variant = 'default',
    icon = false,

    style: styleOverride,
    ...rest
  } = props;

  const { style, children } = getProps({
    size,
    variant,
    icon,
  });

  return (
    <div style={{ ...style, ...styleOverride }} {...rest}>
      {childrenOverride}
    </div>
  );
};

export default Button;
export type { Props };
