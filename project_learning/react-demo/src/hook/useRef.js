import React, { createRef, useEffect, useRef } from "react";

function UseRef() {
  /*
  - createRef 每次重新渲染，都会重新创建一个新的ref对象
  - useRef 第一次渲染，创建ref对象之后，当重新渲染不再重复创建
  所以，useRef的性能优于createRef
   */
  const inputRef = createRef(); // inputRef.current is None
  console.log(inputRef);
  const useInputRef = useRef(); // useInputRef.current is undefined
  console.log(useInputRef);

  // 用 useEffect 查看渲染完成后的 inputRef 和 useInputRef
  useEffect(() => {
    console.log("useEffect: " + inputRef);
    console.log("useEffect: " + useInputRef);
  });

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button
        onClick={() => {
          inputRef.current.focus();
        }}
      >
        focus
      </button>
      <br />
      <input type="text" ref={useInputRef} />
      <button
        onClick={() => {
          useInputRef.current.focus();
        }}
      >
        focus
      </button>
    </div>
  );
}

export default UseRef;
