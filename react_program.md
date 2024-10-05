# 项目实战

- [项目实战](#项目实战)
  - [环境准备](#环境准备)
  - [项目搭建](#项目搭建)
  - [组件通信](#组件通信)
    - [父组件向子组件传值](#父组件向子组件传值)
    - [子组件像父组件传值](#子组件像父组件传值)
    - [组件参数校验](#组件参数校验)
    - [爷组件向孙组件传值](#爷组件向孙组件传值)
    - [```context```传值](#context传值)
  - [生命周期](#生命周期)

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

## 组件通信

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

- 初始化阶段



