import { useContext } from 'react';
import MessageContext from '../MessageContext';

function ComponentList() {
  const { components } = useContext(MessageContext);
  return <div>{components}</div>;
}

export default ComponentList;
