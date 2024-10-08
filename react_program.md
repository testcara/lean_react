# React 高级知识

- [React 高级知识](#react-高级知识)
  - [环境准备](#环境准备)
  - [项目搭建](#项目搭建)
  - [父子组件通信](#父子组件通信)
    - [父组件向子组件传值](#父组件向子组件传值)
    - [子组件像父组件传值](#子组件像父组件传值)
    - [组件参数校验](#组件参数校验)
    - [爷组件向孙组件传值](#爷组件向孙组件传值)
    - [```context```传值](#context传值)
  - [生命周期](#生命周期)
  - [兄弟组件传值](#兄弟组件传值)
  - [render性能分析](#render性能分析)
    - [类组件性能](#类组件性能)
    - [函数组件性能](#函数组件性能)
    - [render性能优化](#render性能优化)
  - [ref获取真实dom结点和组件](#ref获取真实dom结点和组件)
  - [高级组件](#高级组件)
    - [回调函数](#回调函数)
    - [高级函数](#高级函数)
    - [高阶组件](#高阶组件)
  - [Hook](#hook)
    - [useState](#usestate)
    - [useEffect](#useeffect)
    - [useReducer](#usereducer)
    - [useRef](#useref)

我们在```React Basics```中直接用```html```演示知识点。在本章的学习中，我们基于```React```项目结构去学习。

## 环境准备

需要安装node, webpack, yarn
我的环境已经安装完毕，这里不再重复安装。只列出相应的版本信息。

```bash
node --version # v20.17.0
yarn --version # 1.22.22
```

npx 是一个 npm 包运行工具，它允许你临时安装并运行一个 npm 包，而不需要永久地将它安装到你的系统中。这意味着你可以使用 npx 来运行命令行工具或脚本，而不需要全局安装它们，这样可以节省磁盘空间并避免版本冲突。

yarn包管理工具，类似于fedora的dnf。

## 项目搭建

- 项目初始化

```bash
yarn init -y
```

生成了```package.json```。

- 安装脚手架

```bash
yarn add -D create-react-app
```

生成了node_modules和yarn.lock。

查看```create-react-app```版本

```bash
npx create-react-app --version # 5.0.1
```

- 创建项目
  
```bash
npx create-react-app react-demo
```

生成了react-demo目录。然后执行```yarn start```去启动服务。如果出现找不到react-scripts的错误，那就直接```yarn install react-scripts```，然后再接着执行```yarn start```就可以了。

- 项目目录
  
```bash
carawang@project_learning %tree  -L 1 react-demo 
react-demo
├── README.md 
├── node_modules # 项目依赖文件
├── package-lock.json # 项目配置文件
├── package.json # 项目配置文件
├── public # 静态资源目录
├── src # 项目核心代码
└── yarn.lock # 项目依赖文件

4 directories, 4 files
```

```public```目录下的```manifest.json```定义了没网状态下也可以访问的网页。
```src```目录下的```reportWebVitals.js```是用来监测网页性能的。
```src```目录下的```setupTests.js```是用来做单元测试的。

使用```yarn eject```会生成scripts和config目录。这俩目录是webpack相关的，只有当我们需要配置webpack的时候才需要执行该命令，否则不要这行该命令。这个命令是单向的，不可撤销。

## 父子组件通信

父传子使用```props```，子传父用```props```和回调函数。下面示例中仅包含部分关键代码段。完整代码请参该[commit](https://github.com/testcara/react_learning/commit/51df9d83559985439bf6e60ab3bbf13db92daed3)

### 父组件向子组件传值

我们在```src```目录下创建```fzPros```目录，并创建```index.js```，```father.js```，```child.js```，在这里我们实现从father.js向child.js传值。

```javascript
// 在father.js的class中，创建state
    state = {
        name: "the middle",
        msg: "good developer",
    }
// 然后在调用<Child/>组件的地方引用state
    <Child {...this.state} />
// 在child.js的class中，通过props引用这些值
    let { name: pName, msg: pMsg } = this.props
    <p>father: {pName}--{pMsg} </p>
```

### 子组件像父组件传值

我们需要实现从child.js向father.js传值。

```javascript
// father.js中定义函数
// 在state中添加data state
    receiverDataFromChild = (data) => { 
        console.log('receive data from child', data)
        this.setState(
            { data: data }
        )
    }
// 绑定函数到子组件
<Child {...this.state} sendDataToParent={ this.receiverDataFromChild } />
// 在父组件中显示data
<p>msg from child: { data }</p>

// child.js中定义函数
    sendData = () => {
        const data = 'hi, parent'
        this.props.sendDataToParent(data)
    }
// 触发函数
<button onClick={this.sendData}>send data to parent</button>
```

当我们触发按键时，父组件就会得到相应的数据。

### 组件参数校验

- 安装```prop-types```
  
```sh
yarn add -D prop-types
```

- 在要使用```prop-types```的```js```文件中引入

```javascript
import PropTypes from 'prop-types'
```

- 定义组件的```propTypes```

```javascript
Child.propTypes = {
    name: PropTypes.string
}
```

这个时候，如果将```father.js```中```state```定义的```name```改成一个整数，则可以看到```console```报错:

```javascript
Failed prop type: Invalid prop `name` of type `number` supplied to `Child`, expected `string`.
```

这样就完成了传值类型的校验。

如果把代码改成：

```javascript
Child.propTypes = {
    name: PropTypes.string.isRequired
}
```

并把```father.js```中```state```定义的```name```移除， 则可以看到```console```报错：

```javascript
Failed prop type: The prop `name` is marked as required in `Child`, but its value is `undefined`.
```

这样就完成了必须传哪些值的校验。我们还可以设置默认值，这样即使不传值的时候，也不会报错，而会采用默认值。

```javascript
Child.defaultProps = {
    name: 'father'
}
```

### 爷组件向孙组件传值

让我们设置场景：
爷爷组件有一个下拉框，可以选择颜色，爷爷选择了颜色，孙子显示该选中的颜色。
通过```props```进行传值的话，显示原理和父组件向子组件相同，都是第一个父亲传给他儿子这个第二个父亲，
第二个父亲传给他儿子。我们这里不再详细列举，请看[commit](https://github.com/testcara/react_learning/commit/f403101bfd261fd3bcb85d8c89390486bc88a174)

通过代码，我们可以看到一层一层的传值，还是很麻烦的。对于一个组件而言是全局的变量（例如，用户登陆信息、使用的语言等），我们不需要用```props```，而用```context``，是所有组件都可以很方便的获取到这些值。下面
我们示例如何用```context```实现传值。

### ```context```传值

我们使用```context```来实现在爷孙组件间传值。我们除了创建了```context.js```，还创建了```main.js```作为爷组件，```hello.js```作为父组件，```world.js```作为子组件，```world-son.js```作为孙组件来帮助我们理解。下文仅截取了关键的代码段。具体的代码可以参考(commit)[#]

- 创建单独的```context.js```

```javascript
import React from "react";

const MainContext = React.createContext()

export default MainContext
```

- 在爷组件中使用```MainContext.Provider```
  
```javascript
import MainContext from './context'
                <MainContext.Provider value='casey'>
                    Main page
                    <Hello />
                </MainContext.Provider>
```

- 在父组件使用```context```

```javascript
static contextType = MainContext
            <div>
                Hello Page -- { this.context }
                <World />
            </div>
```

- 在子孙组件使用```context```

```javascript
// 在类结束后定义
Worldson.contextType = MainContext
// 然后再文中使用
        <div>
            Son of World page -- { this.context }
        </div>
```

在父组件的用法和子孙组件的用法是能相互替代的，实现的效果一致。

- context传多个值

我们仅列出需要改变得的地方。完整代码可参考[commit](https://github.com/testcara/react_learning/commit/086e93f813c210b4f8cef4203d96f4d2eb098f85)。

我们首先在爷组件中赋值。

```javascript
<MainContext.Provider value={{name:'casey', age: '10'}}>
```

然后在其他后代组件中使用。

```javascript
static contextType = MainContext
            <div>
                Hello Page<br/>
                <p>name: {this.context.name}</p>
                <p>age: {this.context.age}</p>
                <World />
            </div>
```

## 生命周期

在React中只有类组件有生命周期。生命周期定义了决定了组件的开始到结束。了解清楚程序中生命周期，可以清楚
的明白代码的执行过程和代码的执行顺序。

生命周期分为四个阶段：组件初始化阶段、组件加载阶段、组件更新阶段、组件销毁阶段。

初始化阶段一般在```constructor```函数中去完成组件初始化。```componentWillMount```也是在```render```组件前完成。

组件加载就是```render```和```componentDidMount```阶段。一般，只要组件状态发生变化，```render```一定会执行。

```render```函数会插入```jsx```生成的```dom```结构，```react```会生成一个虚拟的```dom```树。
在每一次组件更新时，React会通过```diff```算法比较更新前后的新旧```dom```树，比较以后，会找到
最小的有差异的```dom```节点，并重新渲染。

组件更新有```shouldComponentUpdate```， ```componentWillUpdate```， ```componentDidUpdate```，当```shouldComponentUpdate```返回```true```的时候，组件才会更新和加载。否则，前端页面不会有任何变化。为```true```时的执行顺序为：```WillUpdate```，```render```，```DidUpdate```。

组件销毁使用是```componentWillUnmount```，用来卸载组件和销毁数据，清除所有的定时器和事件监听。

关于生命周期的代码演示，请参考[commit](https://github.com/testcara/react_learning/commit/7d7996ec7b243dd61269b196c6ff32a3cf24bcf6)

另外，我们还会在生命中发送一些请求。通常发送请求发生在```componentWillMount```和```componentDidMount```。更详细的发送请求的内容我们会在后面章节讲解。

## 兄弟组件传值

兄弟组件传值用eventbus进行传值。

- 安装event
  
```javascript
yarn add -D events
```

我们在```src```目录下创建```broEvents```目录，并创建```index.js```，```header.js```，```footer.js```，在这里我们实现从```header.js```向```footer.js```传值。

以下我们仅列出关键代码。完整代码请看[commit](https://github.com/testcara/react_learning/commit/b3f793f90b7464ca5da2f21c57cba9d43c58169e)。

- 创建事件总线

创建单独的```event.js```，引入并创建事件总线。

```javascript
import { EventEmitter } from 'events'

// 导入事件总线，利用这个对象发射和监听事件，这个对象
// 是全局的。
const eventBus = new EventEmitter()

export default eventBus
```

- 发送事件

在```header.js```中发送事件。
  
```javascript
    send = () => { 
        let name = "像风一样自由"
        let arr = [1, 2, 3]
        let obj = {
            name: 'casey',
            age: 18
        }

        // 发送事件，emit(事件名，参数)
        eventBus.emit('sayHello', name, arr, obj)
    }
```

- 接收事件
  
在```footer.js```中，不同的生命周期阶段中接收事件并销毁事件。

```javascript
    componentDidMount() {
        eventBus.addListener('sayHello', this.sayHelloListener)
    }

    componentWillUnmount() {
        eventBus.removeListener('sayHello', this.sayHelloListener)
    }

    sayHelloListener(a, b, c) {
        console.log(a, b, c)
    }
```

## render性能分析

我们在将生命周期组件加载的时候，讲了```render```的加载的技术逻辑，生成虚拟```dom```，```diff```然后```patch```最小的```dom```，然后渲染。在其他生命周期里讲了，组件```state```发生变化，必定触发```render```。这里说的都是一个组件的```render```。

以下，我们来看```render```的性能。我仅列出了关键代码，完整代码请参考[commit](https://github.com/testcara/react_learning/commit/827829b53c17d80c223716f6e7574d904942b6ee)。

### 类组件性能

我们创建```src/repeatRender```目录，并创建```root.js```，在```root.js```中创建```Root```，```Main```，```Header```，```Footer```类组件。
其四者的关系为：

```javascript
            <div>
                root 组件渲染了
                <Header />
                <Main />
                <Footer />
            </div>
```

我们在```Root```类组件中，添加状态，添加```consolog.log```，并通过点击按钮使这个跟组件状态发生变化，观察其他组件是否
跟随根组件一起变化。

```javascript
    state = {
        num: 0
    }

    onClick = () => { 
        this.setState({
            num: this.state.num  +1
        })
    }

    console.log('root 组件渲染了')

    <button onClick={this.onClick}>点我+1</button>
```

通过观察```log```发现，当跟组件有变化```render```时，其所有子组件也都跟着一起```render```。这样的性能消耗时巨大的。

### 函数组件性能

我们在```repeatRender```目录下创建```functionRoot.js```，复制```root.js```中的代码，更改根组件为```Functionroot```，并将除```Root```组件外的其他组件，都改成如下函数式组件。

```javascript
function Header()  {
    console.log('header 组件渲染了')
    return (
        <div>
            header
        </div>
    )
}
```

我们查看日志，发现所有的组件也均被重新加载。好像和类组件性能没有分别。但是如果对比LCP和INP发现，类组件的LCP是函数组件的2倍。函数组件性能较好。

为什么子组件总是会被重复加载？这是因为根组件是类组件，在类组件组件加载这个生命阶段，它遇到了子组件，就需要加载子组件，加载完子组件之后，回到根组件继续加载根组件的其他元素，才能完成类组件加载这个生命阶段。

### render性能优化

我们在学习生命周期的时候，知道了可以使用```shouldComponentUpdate```控制组件更新。

回到```root.js```，我们进行添加该函数给子组件。就可以使其不更新。
但是这种优化方法很少用，因为需要在每个层级进行手动配置，比较麻烦。

```javascript
    shouldComponentUpdate(nextProps, nextState) {
        // 当组件中props更新了，就更新。否则不更新。
        // 我们在根组件中更新的是state，所以这里总是
        // return false。
        if (this.props.num !== nextProps.num) {
            return false
        } else { 
            return true
        }
    }
```

React封装了这个功能为```PureComponent```，浅比较```props```和```state```，没有变化就不更新。

我们继续在```repeatRender```目录下新建文件```perfRoot.js```，尝试使用```PureComponent```。

首先引入```PureComponent```，然后在文件中的类组件中都继承。

```javascript
import React, { PureComponent } from 'react'
export class Perfroot extends PureComponent
```

这样，我们就可以看到除了第一次访问界面时，所有组件都加载了之后。点击按钮更新```state```，就只有根组件进行更新了。

使用```PureComponent```很简单便捷，但是也有它的弊端。我们提到了浅比较，当数据结构过于复杂时，这个方法就失效了。

```javascript
// PureComponent可以用
    state = {
        num: 0
    }

// PureComponent无法保证更新决策正确
    state = {
        obj : {
            name: 'casey',
            age: 18
        }
    }
```

还有，基于它的基于生命周期的控制实现的优化，所以不可能用于函数组件。

关于这点的完整代码，请参考[commit](https://github.com/testcara/react_learning/commit/7de44f32ed35f245283de845c50cda8f8b69d745)。

## ref获取真实dom结点和组件

组件并不是真实的```dom```结点。React开发中，不建议直接操作真实的```dom```。组件中的```dom```是存在于内存中一种数据结构，叫做虚拟```dom```。如果需要从组件中获取真实的```dom```就需要使用```ref```属性。
通过```ref```可以访问在```render```中创建的```dom```对象和组件实例。

- 引入并创建```createRef```

```javascript
// 引入
import React, { createRef, Component } from 'react'
// 在根组件constructor中创建
    constructor() { 
        super()
        this.headRef = this.createRef()
    }
```

- 绑定组件

```<Header />```为根组件```render```的子组件。

```javascript
    <Header ref={this.headRef} />
    <button onClick={this.changeText}>点击</button>
```

- 查看组件信息
  
```current```指向```<Header />```组件。

```javascript
    changeText = () => { 
        console.log(this.headRef)
        console.log(this.headRef.current.state.name)
    }
```

- 直接更改dom

我们尝试用在```input```里输入内容，然后通过```ref```直接修改元素```<p>```中的内容。
关键代码如下。完整代码请参考[commit](https://github.com/testcara/react_learning/commit/154d4d02a6be5b8d7a60505c0aa4d902c506adbc)。

```javascript
    this.inputRef = createRef()
    this.pRef = createRef()

    <p ref={this.pRef}>等待修改</p>
    <input type='text' onChange={this.changeInput}
        ref={this.inputRef}></input>

    changeInput = () => {
        this.pRef.current.innerHTML = this.inputRef.current.value
    }
```

## 高级组件

### 回调函数

回调函数是```javascript```的一个概念。为了后面讲解高阶函数和高阶组件。我们在这里讲解以下。

```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback('这是从服务器获取的数据');
    }, 1000);
}

function onDataReceived(data) {
    console.log(data);
}

// 调用fetchData，并传入onDataReceived作为回调函数
fetchData(onDataReceived);
```

在这个例子中，```fetchData```函数接受一个```callback```参数，这是一个函数。
```onDataReceived```函数是我们提供的回调函数。当我们调用```fetchData```并传入```onDataReceived```函数，定时器到点执行该函数。

### 高级函数

当一个函数的参数为函数或者返回值为函数时，这个函数就叫高阶函数。例如```add(5, -5, Math.abs)```
就是最简单的高阶函数，还有常用到```map()```函数，也是高阶函数。它可以接收函数，对列表中的每个元素使用该函数，并返回新的列表。

现在，我们在```React```中实践高级函数。
我们创建```src/hocFunctions```目录，在目录下创建```hf.js```，来模拟一个简单的登入登出。

```javascript
function login(username) { 
    console.log(username + ' log in!')

}

function logout(username) { 
    console.log(username + ' log out!')

}

function propUsername(callback) { 
    function getUsername() {
        let username = 'casey'
        callback(username)
    }
    return getUsername
}

let newLogin = propUsername(login)
let newLogout = propUsername(logout)

newLogin()
newLogout()
```

在终端运行```node hf.js```，就可以看到日志。

### 高阶组件

高阶组件就是一个高阶函数，只是函数参数是组件，返回的也是一个组件。高阶组件是```React```中
复用组件的一个高阶技巧，它并不是```React```的```api```的一部分，而是一种设计模式。

让我们使用高阶组件实现我们在讲解高阶函数用的登入/登出的。登入登出功能，都需要用到```state```来
存储名字，并需要用到```componentDidMount()```去更改```username```。代码片段如下：

```javascript
state = {
    username: ''
}
componentDidMount() { 
    let username = 'admin'
    this.setState({
        username: username
    })
}
```

我们就需要把这个重复使用的代码段封装成一个高级组件，然后引用该封装后的组件。我们的封装如下：

```javascript
import React, { Component } from 'react'

function PropUsername(CallbackComponent) {
    class NewComponent extends Component {
        state = {
            username: ''
        }
        componentDidMount() { 
            let username = 'admin'
            this.setState({
                username: username
            })
        }
        render() {
            return <CallbackComponent username={ this.state.username} />
        }
    }
    return NewComponent
}

export default PropUsername
```

然后在登入登出文件中，使用该组件如下：

```javascript
import PropUsername from './username'
<p>{ this.props.username } log in!</p>
export default PropUsername(Login)
```

代码片段仅列出出了关键代码。完整代码请参考[commit](https://github.com/testcara/react_learning/commit/d6e8bfaa49c196d0f191941a523ed14171aa4764)。

高阶组件除了复用组件，还可以用来复用```props```。

```javascript
<div>
    <Boy name='John' age='15' hobby='dancing' />
    <Gril name='Casey' age='15' hobby='dancing' />
</div>
```

如上，根组件包含的子组件中包含的```props```相似度很高，仅有name不同。这里我们就可以使用高级组件进行封装和使用。

```javascript
const PropsComponent = (Component) => { 
    const NewComponent = (props) => { 
        return <Component {...props} age='15' hobby='dancing' />
    }
    return NewComponent
}

const NewBoy = PropsComponent(Boy)
const NewGril = PropsComponent(Gril)

<div>
    <NewBoy name='John' />
    <NewGril name='Casey' />
</div>
```

代码片段仅列出出了关键代码。完整代码请参考[commit](https://github.com/testcara/react_learning/commit/3fbc539f9f70ce276761e3a03d01077f76651c96)。

## Hook

函数式组件是无状态组件，没有生命周期。类组件是有状态和生命周期的。如果我们又想用函数式组件，又希望它能有
状态和生命周期，就需要```Hook```。```Hook```的出现，解决了高阶组件嵌套难的问题。

### useState

我们用类组件实现点击器是很容易的，本节我们用```Hook```和函数式组件来实现。

```javascript
import React, { useState } from "react";

/*
useState本身是个函数，有参数和返回值
调用useState返回的是一个数组。
第一个元素是当前的状态。
第二个元素是一个函数，这个函数的作用是去修改和设置我们的状态。
*/

function HookCounter() {
  const arr = useState(0);
  const state = arr[0];
  // changeState可以替换成任意名
  const changeState = arr[1];
  return (
    <div>
      {state}
      <button onClick={() => changeState(state + 1)}>+1</button>
    </div>
  );
}

export default HookCounter;
```

我们把解释和代码都放在上述代码段中。在实际应用中，我们会如下更好的去赋值。

```javascript
const [state, setState] = useState(0)
```

以上这个案例是最简单的案例。赋值可以是列表，对象，字典，和它们的混合类型。更多的例子可参考[commit](https://github.com/testcara/react_learning/commits/main/)。

我们以上所有的例子中，都是直接给赋初始值。其实，这里我们也可以传入一个函数。当传入一个函数时，会用这个函数来生成初始状态值。React会在组件首次渲染时调用这个函数来设置初始状态，但在后续的渲染中则不会调用。请看以下例子。

```javascript
import React, { useState } from 'react';

function MyComponent() {
  // 使用函数来生成初始状态
  const [count, setCount] = useState(() => {
    return 0; // 初始状态为0
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default MyComponent;
```

这种方式很有用，特别是当生成初始状态需要一些计算，或者你想确保使用的是最新的props值时。

记住，这个函数只会在组件首次渲染时调用一次。如果你需要在组件每次渲染时都运行某些代码来更新状态，你应该使用```useEffect Hook```。

### useEffect

```useState```让函数组件有状态，```useEffect```让函数组件有生命周期。
我们先用类组件实现更改页面内容，```title```也随之变化。代码如下：

```javascript
import React, { Component } from "react";

export class ClassLifecycle extends Component {
  state = {
    count: 0,
  };

  componentDidUpdate() {
    document.title = `你点击了${this.state.count}次!`;
  }
  render() {
    return (
      <div>
        <p>你点击了{this.state.count}次！</p>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default ClassLifecycle;
```

我们用```useEffect```加函数组件实现该功能。```useEffect```有组件加载、组件更新·组件卸载的三个生命周期方法的组合。代码如下。

```javascript
import React, { useState, useEffect } from "react";

function UseEffect() {
  const [count, setCount] = useState(0);
  /*
  useEffect第一次渲染和每次更新后都会执行。
   */
  useEffect(() => {
    // 反引号定义字符串
    document.title = `你点击了${count}次`;
  });

  return (
    <div>
      <p>你点击了{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +1
      </button>
    </div>
  );
}

export default UseEffect;
```

这里的```useEffect```时第一次加载和每次更新时，都会运行。而当我们如下添加参数。

```javascript
useEffect(() => {
    console.log("i am useEffect");
}, []);
```

就会出现除了第一次加载时，```useEffect```执行，其他任何时候不再次执行。这是因为传入了```[]```。
这个列表是依赖项。空列表表示不跟踪任何值的状态。当我们有多个状态时，填入一个状态为依赖项，就只有这个
状态变化时，```useEffect```会执行。

我们在学生命周期的时候，还学到了当组件卸载时，定时器必须清除。```useEffect```是组件加载，更新，卸载的结合体，那我们在```useEffect```中如何实现定时器的清除呢？关键代码如下：

```javascript
  const [state, setState] = useState(0);

  const timer = useEffect(() => {
    setInterval(() => {
      setState((prev) => prev + 1);
    }, 500);
    //清除定时器
    return () => clearInterval(timer);
  });
```

则完成代码请参考[commit](https://github.com/testcara/react_learning/commit/ed45d12c9bc42e9b23d4f9b1e5ecf3a4b11b1442)。

### useReducer
我们用```useState```可以来管理状态，但是当一个状态依赖于另一个状态，且状态转化多样时，```useState```就不太适用了。这里就需要使用```useReducer```。

```useReducer```允许封装状态逻辑并管理复杂的状态更新规则，当状态结构复杂或需要多个状态之间的逻辑时，useReducer更加适合。 

我们用useState可以轻松实现增加state的功能，但是当我们希望可以同时实现增减重置等多个状态改变。看以下```useReducer```代码。

```javascript
import React, { useReducer } from 'react';

// 定义 reducer 函数
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

function Counter() {
  // 使用 useReducer Hook
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

export default Counter;
```

在这个例子中，我们定义了一个```reducer``` 函数，它根据传入的```action``` 类型来更新状态。然后，我们在```Counter```组件中使用```useReducer Hook```，并传入```reducer```函数和初始状态```{ count: 0 }```。```useReducer```返回当前状态```state``` 和一个```dispatch```方法。我们通过调用```dispatch```方法并传入不同的```action```对象来更新状态。

### useRef

```useRef```和```createRef```用起来很像。我们将他们对比理解，用法代码如下：

```javascript
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
```

我们可以看到它们可以获取对组件或```DOM```节点的引用。

但是在类组件中，我们使用```createRef```，而在函数组件中，使用```useRef```。如代码中所说， ```useRef```返回的```ref```对象在组件的整个生命周期内是稳定的，不会改变。 ```createRef```返回的每次都是一个新对象。```useRef```通常用于在渲染间保持任何可变的值，以及访问```DOM```节点。它也可以用于在组件的整个生命周期内保存上一次的```props``` 或```state```。

高级知识中，还有```router```，我们将在项目实践中去学习。