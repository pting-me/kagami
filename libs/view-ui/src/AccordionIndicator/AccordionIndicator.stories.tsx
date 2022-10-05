import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@reach/accordion';
import type { Meta, Story } from '@storybook/react';

import AccordionIndicator from './AccordionIndicator';

const meta: Meta = {
  component: AccordionIndicator,
  argTypes: {},
};

const InsideAccordion: Story = {
  render: () => {
    return (
      <Accordion collapsible multiple>
        <AccordionItem>
          <AccordionButton className="flex py-2">
            <div>
              <AccordionIndicator />
            </div>
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
