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
          <AccordionButton className="flex">
            <div>
              <AccordionIndicator />
            </div>
            <div>Button</div>
          </AccordionButton>
          <AccordionPanel>Content</AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  },
};

export default meta;
export { InsideAccordion };
