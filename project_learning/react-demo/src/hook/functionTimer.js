import React, { useState, useEffect } from "react";

function FunctionTimer() {
  const [state, setState] = useState(0);

  const timer = useEffect(() => {
    setInterval(() => {
      setState((prev) => prev + 1);
    }, 500);
    //清除定时器
    return () => clearInterval(timer);
  });
  return <div>{state}</div>;
}

export default FunctionTimer;
