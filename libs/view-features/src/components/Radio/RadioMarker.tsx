import { ComponentPropsWithoutRef, FC } from 'react';

interface Props extends ComponentPropsWithoutRef<'svg'> {}

const RadioMarker: FC<Props> = (props: Props) => {
  return (
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="8" cy="8" r="3" />
    </svg>
  );
};

export default RadioMarker;
