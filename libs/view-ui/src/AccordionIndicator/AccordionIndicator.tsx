import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { ComponentPropsWithoutRef, FC } from 'react';

import './AccordionIndicator.css';

interface Props extends ComponentPropsWithoutRef<'div'> {
  svgClassName?: string;
}

/**
 * Indicator to be used inside @reach/accordion
 */
const AccordionIndicator: FC<Props> = (props: Props) => {
  const { className: baseClassName, svgClassName, ...rest } = props;
  const className = clsx(baseClassName, 'flex items-center');
  const collapsedClassName = clsx(
    svgClassName,
    'kagami--accordion-indicator-collapsed'
  );
  const openClassName = clsx(svgClassName, 'kagami--accordion-indicator-open');

  return (
    <div className={className} {...rest}>
      <ChevronRightIcon className={collapsedClassName} aria-label="Collapsed" />
      <ChevronDownIcon className={openClassName} aria-label="Open" />
    </div>
  );
};

export default AccordionIndicator;
export { Props as AccordionIndicatorProps };
