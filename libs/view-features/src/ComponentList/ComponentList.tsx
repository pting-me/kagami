import React, { useContext } from 'react';
import MessageContext from '../MessageContext';

function ComponentList() {
  const store = useContext(MessageContext);
  return <div>{store.state.components}</div>;
}

export default ComponentList;
