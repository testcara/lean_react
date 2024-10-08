import React, { useState, useEffect } from "react";

function ComplexEffect() {
  const [age, setAge] = useState(0);
  const [money, setMoney] = useState(1000);
  useEffect(() => {
    console.log("i am useEffect");
  }, []);
  return (
    <div>
      <p>age:{age}</p>
      <p>money:{money}</p>
      <button onClick={() => setAge(age + 1)}>+age</button>
      <button onClick={() => setMoney(money + 1)}>+money</button>
    </div>
  );
}

export default function App() {
  const [show, setShow] = useState(true);
  return (
    <div>
      <h1>show</h1>
      <button onClick={() => setShow(!show)}>switch page</button>
      {show && <ComplexEffect />}
    </div>
  );
}
