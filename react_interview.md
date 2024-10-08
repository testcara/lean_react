# 面试相关问题

## setState

### 为什么会有setState?

React没有实现```Vue2```中```Object.defineProperty```或者```Vue3 proxy```的方式来监听数据的变化，而必须
通过```setState```来主动告知React状态的改变。```setState```继承自```Component```，当
我们调用```setState```的时候，会自动执行```render```方法，根据最新的```state```重新渲染
界面。

### setState是异步的吗？

是异步的，它的异步是执行顺序决定。而不是有异步代码控制的。但是我们可以操控生命周期，譬如在```componentDidMount```中使用定时器函数，就可以使之变成同步的，从而获得当前的实时数据。

## ref

组件并不是真实的```dom```结点。React开发中，不建议直接操作真实的```dom```。组件中的```dom```是存在于内存中一种数据结构，叫做虚拟```dom```。如果需要从组件中获取真实的```dom```就需要使用```ref```属性。
通过```ref```可以访问在```render```中创建的```dom```对象和组件实例。