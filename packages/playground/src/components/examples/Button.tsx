import {
  ComponentPropsWithRef,
  CSSProperties,
  FC,
  ReactElement,
  ReactNode,
} from "react";

// START COMMON SECTION
// This section is the same for all properties.
// You may want to put these in a separate file and import them.

type VariantProperties = {
  [property: string]: unknown;
} | null;

interface ComputedProps {
  style?: CSSProperties;
  children?: ReactNode;
}

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
      `${str.toLowerCase()}--${currKey.toLowerCase()}-${String(currVal).toLowerCase()}`,
    ''
  );
};

// END COMMON SECTION

interface NodeProps {
  label?: string;
  secondary?: string;
  iconInstance?: ReactElement | null;
}

interface Props extends ComponentPropsWithRef<'button'>, NodeProps {
  size?:  | 'small' | 'default' | 'large';
  variant?:  | 'default' | 'primary' | 'danger' | 'secondary';
  icon?: boolean;
}

interface GetPropsOptions {
  variantProperties: VariantProperties;
  nodeProps: NodeProps;
}

const getProps = (options: GetPropsOptions): ComputedProps => {
  const { variantProperties, nodeProps } = options;
  const {
    label,
    secondary,
    iconInstance,
  } = nodeProps;

  const serialized = serializeProperties(variantProperties);
  switch (serialized) {

    case '--icon-false--size-default--variant-default':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(242,242,242,1)","borderWidth":"0px 0px 0px 0px","borderColor":"rgba(0,0,0,1);","borderStyle":"solid","padding":"7px 12px 7px 12px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"0px 0px 0px 0px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Default' }
          </div>

      };

    case '--icon-false--size-default--variant-primary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(45,127,249,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"7px 12px 7px 12px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Primary' }
          </div>

      };

    case '--icon-false--size-default--variant-danger':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(239,48,97,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"7px 12px 7px 12px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Danger' }
          </div>

      };

    case '--icon-false--size-default--variant-secondary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"7px 12px 7px 12px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { secondary ?? 'Secondary' }
          </div>

      };

    case '--icon-true--size-default--variant-default':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(242,242,242,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"7px 12px 7px 12px","gap":"7px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"14px","height":"14px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Default' }
          </div>
          </>
      };

    case '--icon-true--size-default--variant-primary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(45,127,249,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"7px 12px 7px 12px","gap":"6.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"14px","height":"14px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Primary' }
          </div>
          </>
      };

    case '--icon-true--size-default--variant-danger':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(239,48,97,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"7px 12px 7px 12px","gap":"6.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"13px","height":"13px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Danger' }
          </div>
          </>
      };

    case '--icon-true--size-default--variant-secondary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"7px 12px 7px 12px","gap":"6.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"14px","height":"14px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { secondary ?? 'Secondary' }
          </div>
          </>
      };

    case '--icon-false--size-small--variant-default':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(242,242,242,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"5px 10px 5px 10px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Default' }
          </div>

      };

    case '--icon-false--size-small--variant-primary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(45,127,249,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"5px 10px 5px 10px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Primary' }
          </div>

      };

    case '--icon-false--size-small--variant-danger':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(239,48,97,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"5px 10px 5px 10px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Danger' }
          </div>

      };

    case '--icon-false--size-small--variant-secondary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"5px 10px 5px 10px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { secondary ?? 'Secondary' }
          </div>

      };

    case '--icon-true--size-small--variant-default':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(242,242,242,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"5px 10px 5px 10px","gap":"6.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"14px","height":"14px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Default' }
          </div>
          </>
      };

    case '--icon-true--size-small--variant-primary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(45,127,249,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"5px 10px 5px 10px","gap":"6.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"14px","height":"14px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Primary' }
          </div>
          </>
      };

    case '--icon-true--size-small--variant-danger':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(239,48,97,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"5px 10px 5px 10px","gap":"6.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"14px","height":"14px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Danger' }
          </div>
          </>
      };

    case '--icon-true--size-small--variant-secondary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"5px 10px 5px 10px","gap":"6.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"14px","height":"14px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"13px","fontWeight":"600","lineHeight":"18px"} }>
            { secondary ?? 'Secondary' }
          </div>
          </>
      };

    case '--icon-false--size-large--variant-default':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(242,242,242,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"9px 14px 9px 14px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"15px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Default' }
          </div>

      };

    case '--icon-false--size-large--variant-primary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(45,127,249,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"9px 14px 9px 14px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"15px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Primary' }
          </div>

      };

    case '--icon-false--size-large--variant-danger':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(239,48,97,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"9px 14px 9px 14px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"15px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Danger' }
          </div>

      };

    case '--icon-false--size-large--variant-secondary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"9px 14px 9px 14px","gap":"10px","display":"flex","alignItems":"center"},
        children: 
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"15px","fontWeight":"600","lineHeight":"18px"} }>
            { secondary ?? 'Secondary' }
          </div>

      };

    case '--icon-true--size-large--variant-default':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(242,242,242,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"9px 14px 9px 14px","gap":"7.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"16px","height":"16px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"15px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Default' }
          </div>
          </>
      };

    case '--icon-true--size-large--variant-primary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(45,127,249,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"9px 14px 9px 14px","gap":"7.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"16px","height":"16px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"15px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Primary' }
          </div>
          </>
      };

    case '--icon-true--size-large--variant-danger':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"rgba(239,48,97,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"9px 14px 9px 14px","gap":"7.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"16px","height":"16px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(255,255,255,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"15px","fontWeight":"600","lineHeight":"18px"} }>
            { label ?? 'Danger' }
          </div>
          </>
      };

    case '--icon-true--size-large--variant-secondary':
      return {
        style: {"borderRadius":"3px 3px 3px 3px","backgroundColor":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","padding":"9px 14px 9px 14px","gap":"7.5px","display":"flex","alignItems":"center"},
        children: <>
          <div style={ {"borderRadius":"0px 0px 0px 0px","color":"","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"","fontSize":"","fontWeight":"","lineHeight":"","width":"16px","height":"16px"} }>
            { iconInstance ?? 
      <div
        style={{ border: '1px solid rgba(0,0,0,0.25)', height: '100%', width: '100%' }}
      ></div>
     }
          </div>
          <div style={ {"borderRadius":"","color":"rgba(51,51,51,1)","borderWidth":"1px 1px 1px 1px","borderColor":"initial","borderStyle":"none","fontFamily":"SF Pro Text, sans-serif","fontSize":"15px","fontWeight":"600","lineHeight":"18px"} }>
            { secondary ?? 'Secondary' }
          </div>
          </>
      };
    default:
      return {};
  }
};

const Button: FC<Props> = (props: Props) => {
  const {
    children: childrenOverride,
    size='default',
    variant='default',
    icon=false,
    label,
    secondary,
    iconInstance,
    style: styleOverride,
    ...rest
  } = props;

  const { style, children } = getProps({
    variantProperties: {
    size,
variant,
icon,
    },
    nodeProps: {
    label,
secondary,
iconInstance,
    },
  });

  return (
    <button style={ { ...style, ...styleOverride } } {...rest}>
      {childrenOverride ?? children}
    </button>
  );
};

export default Button;
export { Button };
export type { Props as ButtonProps };
