import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { FC } from 'react';

import './AccordionIndicator.css';

/**
 * Indicator to be used inside @reach/accordion
 */
const AccordionIndicator: FC = () => (
  <div className="w-4 h-4 flex items-center">
    <ChevronRightIcon className="collapsed-icon" aria-label="Collapsed" />
    <ChevronDownIcon className="open-icon" aria-label="Open" />
  </div>
);

export default AccordionIndicator;
