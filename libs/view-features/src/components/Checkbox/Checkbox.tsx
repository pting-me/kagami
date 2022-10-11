import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  FC,
  forwardRef,
} from 'react';

import './Checkbox.css';
import CheckboxMarker from './CheckboxMarker';

interface Props extends ComponentPropsWithRef<'input'> {
  wrapperProps?: ComponentPropsWithoutRef<'div'>;
  markerProps?: ComponentPropsWithoutRef<'svg'>;
}

const Checkbox: FC<Props> = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const {
      className: baseClassName,
      wrapperProps = {},
      markerProps = {},
      ...rest
    } = props;
    const { className: wrapperClassName, ...wrapperRest } = wrapperProps;
    const { className: markerClassName, ...markerRest } = markerProps;
    return (
      <div className={clsx(wrapperClassName, 'h-4 w-4')} {...wrapperRest}>
        <input
          className={clsx(baseClassName, 'absolute kagami--checkbox')}
          {...rest}
          type="checkbox"
          ref={ref}
        />
        <CheckboxMarker
          className={clsx(markerClassName, 'h-4 w-4')}
          {...markerRest}
        />
      </div>
    );
  }
);

export default Checkbox;
export { Props as CheckboxProps };
