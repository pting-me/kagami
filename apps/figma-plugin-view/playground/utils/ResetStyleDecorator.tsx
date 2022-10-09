import { FC, ReactElement } from 'react';

import resetStyles from './reset.module.css';

const ResetStyleDecorator = (Story: FC): ReactElement => (
  <div className={resetStyles['reset']}>
    <Story />
  </div>
);

export default ResetStyleDecorator;
