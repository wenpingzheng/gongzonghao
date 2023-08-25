import React, { MutableRefObject, useRef } from 'react';

export default () => {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null);
  const onButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  console.log('text');
  return (
    <>
      <input ref={inputRef} type='text' />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};
