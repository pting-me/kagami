import type { FC } from 'react';

/**
 * Not sure where this is located (hidden) in React.
 * Reconstructing based on log output.
 */

interface DocgenValue {
  value: string;
}

interface BaseDocgenPropType {
  name: 'number' | 'boolean' | 'Ref<HTMLDivElement>';
}

type DocgenPropType =
  | BaseDocgenPropType
  | {
      name: 'enum';
      value: DocgenValue[];
    };

export interface DocgenProp<Props> {
  defaultValue?: DocgenValue;
  description: string;
  name: keyof Props;
  required: boolean;
  type: DocgenPropType;
}

interface DocgenInfo<Props> {
  description: string;
  displayName: string;
  props: Record<keyof Props, DocgenProp<Props>>;
}

export interface ComponentWithDocgen<Props = Record<string, unknown>>
  extends FC<Props> {
  __docgenInfo: DocgenInfo<Props>;
}
