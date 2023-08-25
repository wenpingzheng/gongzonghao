import React, { MutableRefObject, Ref, forwardRef, useImperativeHandle, useRef } from 'react';

export interface Props {
  id: string;
}
export interface DestRef {
  value: string;
  getType: () => string;
  focus: () => void;
}

// 整个input节点给父级 .current = <input type="text" id="sss">
export const TestInput = forwardRef((props: Props, ref: Ref<HTMLInputElement>): JSX.Element => {
  return <input type='text' ref={ref} {...props} />;
});

// 返回指定属性
export const DestInput = forwardRef((props: Props, ref: Ref<DestRef>): JSX.Element => {
  const inputEl: MutableRefObject<any> = useRef();
  useImperativeHandle(ref, () => ({
    value: (inputEl.current as HTMLInputElement).value,
    getType: () => (inputEl.current as HTMLInputElement).type,
    focus: () => (inputEl.current as HTMLInputElement).focus(),
  }));
  return <input type='text' ref={inputEl} {...props} />;
});
