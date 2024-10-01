# React Basics

- [React Basics](#react-basics)
  - [从 JavaScript 到 React](#从-javascript-到-react)
  - [基础语法](#基础语法)
    - [组件](#组件)
    - [JSX 编写标签](#jsx-编写标签)
    - [显示数据](#显示数据)
    - [条件渲染](#条件渲染)
    - [渲染列表](#渲染列表)
    - [响应事件](#响应事件)
    - [更新界面](#更新界面)
    - [Hook](#hook)
    - [组件间共享数据](#组件间共享数据)

## 从 JavaScript 到 React

JavaScript 是一种广泛使用的脚本语言，是Web开发的基础。React 则是一个由 Facebook 开发的开源 JavaScript 库，用于构建用户界面。React依赖于 JavaScript，但提供了更高级别的抽象和工具，以简化UI开发。

React 引入了 JSX，这是 JavaScript 的一种语法扩展，允许在 JavaScript 代码中编写类似 HTML 的标记。JSX 不是必需的，但它是 React 开发中的常见做法，因为它提高了代码的可读性和开发效率。

React 通过组件化的方式，鼓励开发者将 UI 拆分成独立、可复用的组件。每个 React 组件都可以包含 JSX，以声明式地描述其UI结构。

综上所述，React 是建立在 JavaScript 之上的一个库，它利用 JavaScript 的能力，并通过引入 JSX 等特性，为开发者提供了一种更高效、更直观的方式来构建用户界面‌

## 基础语法

### 组件

从功能上来说，一个组件是 UI（用户界面）的一部分，它拥有自己的逻辑和外观。组件可以小到一个按钮，也可以大到整个页面。
从实现上来说，React 组件是返回标签的 JavaScript 函数。React 组件必须以大写字母开头，而 HTML 标签则必须是小写字母

```javascript
 function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
```

### JSX 编写标签

上面所使用的标签语法被称为 JSX。JSX 比 HTML 更加严格。你必须闭合标签，如 <br />。一个组件只能返回一个 JSX 标签。

```javascript
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
```

### 显示数据

JSX 会让你把标签放到 JavaScript 中。而大括号会让你 “回到” JavaScript 中，这样你就可以从你的代码中嵌入一些变量并展示给用户。例如，这将显示 user.name:

```javascript
return (
  <h1>
    {user.name}
  </h1>
);
```

更复杂的js文件为：

```javascript
const user = {
  name: 'Hedy Lamarr',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className="avatar"
        src={user.imageUrl}
        alt={'Photo of ' + user.name}
        style={{
          width: user.imageSize,
          height: user.imageSize
        }}
      />
    </>
  );
}
```

### 条件渲染

```javascript
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return (
  <div>
    {content}
  </div>
);
```

### 渲染列表

```javascript
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

export default function ShoppingList() {
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}
```

### 响应事件

你可以通过在组件中声明 事件处理 函数来响应事件：

```javascript
function MyButton() {
  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
}
```

### 更新界面

通常你会希望你的组件 “记住” 一些信息并展示出来，比如一个按钮被点击的次数。要做到这一点，你需要在你的组件中添加 state。

```javascript
import { useState } from 'react';

export default function MyApp() {
  return (
    <div>
      <h1>Counters that update separately</h1>
      <MyButton />
      <MyButton />
    </div>
  );
}

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
```

### Hook

以 use 开头的函数被称为 Hook。useState 是 React 提供的一个内置 Hook。你可以在 React API 参考 中找到其他内置的 Hook。你也可以通过组合现有的 Hook 来编写属于你自己的 Hook。

Hook 比普通函数更为严格。你只能在你的组件（或其他 Hook）的 顶层 调用 Hook。

我们会有专门的章节讲解和实践hook。

### 组件间共享数据

prop位于那层组件，决定了其作用的范围，是组件之间独享还是共享。
