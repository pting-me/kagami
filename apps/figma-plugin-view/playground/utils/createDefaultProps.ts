import { FC } from 'react';

import { ComponentWithDocgen, DocgenProp } from '../types';
import stripQuotes from './stripQuotes';

const createDefaultProps = <Props>(Component: FC<Props>) => {
  const defaultProps: Partial<Props> = {};

  Object.values<DocgenProp<Props>>(
    (Component as ComponentWithDocgen<Props>).__docgenInfo.props
  ).forEach((prop) => {
    const { name, type, defaultValue: baseDefaultValue } = prop;
    const { value: defaultValue } = baseDefaultValue ?? {};
    // ignore ref
    if (name === 'ref') {
      return;
    }

    // Really difficult (maybe impossible) to get typing correct
    // Especially since we're doing anonymous types
    // We pass these values back as `any`, but `defaultProps` is defined
    // So none of the types passed back will be `any`
    if (type.name === 'enum') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      defaultProps[prop.name] = defaultValue
        ? stripQuotes(defaultValue)
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (stripQuotes(type.value[0].value) as any);
    } else if (type.name === 'boolean') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      defaultProps[prop.name] = defaultValue
        ? defaultValue === 'true'
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (false as any);
    } else if (type.name === 'number') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      defaultProps[prop.name] = defaultValue
        ? Number(defaultValue)
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (1 as any);
    }
  });

  return defaultProps;
};

export default createDefaultProps;
