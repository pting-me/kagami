import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@reach/accordion';
import type { Meta, Story } from '@storybook/react';

import AccordionIndicator, {
  AccordionIndicatorProps,
} from './AccordionIndicator';

const meta: Meta<AccordionIndicatorProps> = {
  title: 'AccordionIndicator',
  component: AccordionIndicator,
};

const InsideAccordion: Story<AccordionIndicatorProps> = {
  argTypes: {
    className: { control: 'text', defaultValue: 'w-3 h-3', type: 'string' },
  },
  render: (args) => {
    const { className } = args;
    return (
      <Accordion collapsible multiple>
        <AccordionItem>
          <AccordionButton className="flex items-center py-2">
            <AccordionIndicator className={className} />
            <div className="px-2">Click here to expand the accordion</div>
          </AccordionButton>
          <AccordionPanel className="pl-6 pr-2">
            The arrow should now be pointing down.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export default meta;
export { InsideAccordion };
