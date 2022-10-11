import clsx from 'clsx';
import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  FC,
  forwardRef,
} from 'react';

import './Radio.css';
import RadioMarker from './RadioMarker';

interface Props extends ComponentPropsWithRef<'input'> {
  wrapperProps?: ComponentPropsWithoutRef<'div'>;
  markerProps?: ComponentPropsWithoutRef<'svg'>;
}

const Radio: FC<Props> = forwardRef<HTMLInputElement, Props>((props, ref) => {
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
        className={clsx(baseClassName, 'absolute kagami--radio')}
        {...rest}
        type="radio"
        ref={ref}
      />
      <RadioMarker
        className={clsx(markerClassName, 'h-4 w-4')}
        {...markerRest}
      />
    </div>
  );
});

export default Radio;
export { Props as RadioProps };
