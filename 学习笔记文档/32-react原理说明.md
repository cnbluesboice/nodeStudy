### react原理说明

#### 1：react组件的生命周期

+ 创建阶段：constructor     初始化props 和 state
+ 创建阶段：componentWillMount（不安全） 组件将要挂载
+ 挂载：render   渲染UI（不能使用setState方法）
+ 挂载：componentDidMount     组件挂载完成
+ 更新：shouldComponentUpdate   询问组件是否需要更新
+ 更新：componentWillUpdate（不安全）    组件将要更新
+ 更新：componentDidUpdate    组件更新完毕
+ 卸载：componentWillUnmount   组件从页面消失，执行清理工作（例如：定时器，事件监听等）

组件生命周期：组件从创建到挂载到页面运行，完成复杂的组件功能，分析组件错误原因

钩子函数的作用：为开发人员在不同的阶段操作组件提供时机



#### 2：jsx语法转换过程

+ jsx语法只是createElement的语法糖，会被@babel/preset-react插件编译为createElement语法

```
// jsx 语法
const el = <div className="red" >hello</div>

// createElement() 语法
const el = React.createElement(
  'div',
  { className: 'red'},
  'hello'
)

// React 元素
const el = {
  type: 'div',
  key: null,
  ref: null,
  props: {
    className: 'red',
    children: 'hello'
  }
}
```



#### 3：组件性能优化

减轻state：

+ 只存放组件渲染相关数据，不用做渲染的数据不要放在state中
+ 对于多个方法中要用到的数据，应该放到this中

避免不必要的重新渲染

父组件更新，子组件没有任何变化也会被重新渲染

+ 解决办法：避免子组件重新更新的方法是使用钩子函数shouldComponentUpdate(nextProps, nextState)
+ 作用：通过钩子函数的返回值决定是否重新渲染，返回true则重新渲染，返回false则不重新渲染
+ 触发时机：更新阶段的钩子函数，组件重新渲染前（shouldComponentUpdate => render）
+ 使用纯组件（PureComponent）可以自动实现shouldComponentUpdate的判断，不用手动决定是否重新渲染
+ 纯组件内部是实现的浅层对比，值类型比较两个值是否相同，引用类型比较对象的地址是否相同



#### 3：组件更新机制与setState方法

+ setState的作用：1：修改state数据；2：更新UI

+ 父组件重新渲染时，也会重新渲染子组件，但只会渲染当前组件的子树（当前组件及其子组件都会被更新）

+ setState方法是异步的，如果在一个函数里面重复调用了多次setState，setState等于只执行了一次

+ 如果想要在一个函数中执行多次setState，可以使用回调函数：this.setState((state, props)=>{})



#### 4：虚拟DOM和Diff算法

+ react更新视图的思想是：state发生变化会重新渲染视图
+ 当组件中只有一个DOM发生变化的时候，并不会重新渲染整个组件，只会更新变化的地方，这个部分更新是靠虚拟DOM和Diff算法来实现的
+ 虚拟DOM本质上是一个JS对象，用来描述UI，虚拟对象如下

```
const element = {
  type: 'h1',
  props: {
    className: 'qreeting',
    children: 'hello jsx!'
  }
}
```



#### 5：react合成事件系统

react快速的原因之一是很少操作DOM和浏览器事件，因为太多的浏览器事件会占用很大的内存，消耗性能

react为自己实现了一套合成系统，减少内存消耗，简化了事件逻辑，最大化解决浏览器的兼容问题。

其基本原理就是，所有在JSX声明的事件都会被委托在顶层的document节点上，并根据事件名和组件名称存储回调函数；每次当某个组件触发事件时，，在document节点上绑定的监听函数（**dispatchEvent**）就会找到这个组件和它所有的父组件，对每个组件创建的合成事件并批处理，从而根据事件名和组件名调用回调函数；



react合成事件系统模拟事件冒泡的方法是构建一个自己及父组件的队列，所以因此也带来了一个问题，合成事件不能阻止原生事件，原生事件可以阻止合成事件，用event.stopPropagation()并不能停止事件传播，应该使用event.preventDefault()

#### 6：react性能优化

react中性能的消耗主要耗费在update阶段的diff算法，因此性能的优化主要针对diff算法

1. ##### 减少diff算法的触发次数

   减少diff算法的触发次数实际上就是减少update流程的次数，正常进入update流程有3种方式

   + setState：只将与UI变化有关的数据放在state中，其他与UI无关但是多个函数需要用到的数据直接绑定在this上
   + 父组件的render：组件尽量解耦，并使用PureComponent纯组件，PureComponent会自动触发shouldComponentUpdate钩子对比数据是否发生变化，从而决定是否更新组件
   + forceUpdate方法的调用：forceUpdate方法调用后会直接进入componentWillUpdate阶段，无法拦截，应该弃用

2. ##### 正确使用diff算法

   + 对于条件渲染多个节点时，尽量使用隐藏的方式显示，不要替换节点

   + 尽量少的操作节点