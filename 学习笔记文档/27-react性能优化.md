## react性能优化

#### 1：Code Splitting可以“懒加载”代码， 如果没办法直接减少应用的体积，那么可以把单个的bundle拆分成单个bundle + 多份动态代码的形式，webpack提供3种代码分离的方法：

+ 入口起点：使用entry配置手动的分离代码
+ 防止重复：使用SplitChunks去重和分离chunk
+ 动态导入：通过模块的内联函数调用来分离代码

在此主要了解一下第三种动态导入的方法：

+ 可以改写import的形式

```
将 import { add } from "./math"
改写成 import("./math").then(math=>{ console.log(math.add(16, 23)) })
```



+ 引用react的高阶组件react-loadable进行动态的import

```
import Loadable from "react-loadable";
import Loading from "./loading-component";

const LoadableComponent = Loadable({
	loader: ()=>{import("./my-component")},
	loading: Loading,
});

export default class App extends React.Component {
	render(){
		return <LoadableComponent />;
	}
}
```

以上的代码在首次加载时，会先展示一个loading-component，然后动态加载my-component的代码，组件代码加载完毕之后，便会替换掉loading-component



#### 2：shouldComponentUpdate避免重复渲染

当一个组件的state和props改变时，React通过比较新返回的元素和之前的渲染元素来决定是否有必要更新事件的DOM，当他们不相等时，React会更新DOM。

在一些情况下，可以通过重写组件的shouldComponentUpdate来提升速度，这个钩子函数是在重新渲染过程之前开始触发的，这个函数默认返回true，可使react执行更新；

根据渲染流程，首先会判断shouldComponentUpdate是否需要更新，如果需要则调用组件的render函数生成新的虚拟DOM，然后再与旧的虚拟DOM进行比对，结果一致则不更新，不一致则以最小粒度去更新DOM；如果shouldComponentUpdate不需要更新，则直接保持不变。

因此，我们可以根据自己的业务特性，重载shouldComponentUpdate，可以在shouldComponentUpdate函数中判断某些props和state是否改变，有改变则return true，触发render更新，否则return false，不更新，减少性能消耗；

#### 3：使用不可突变数据结构

React提供两种组件Component（深比较）和PureComponent（浅比较），PureComponent只会比较数据的地址有没有发生变化，不会去比较里面的值是否变化；解决办法有两种

1. 数组使用concat，对象使用Object.assign()；
2. 或者使用ES6的对象展开语法[...arr]，{...obj}



#### 4：组件尽可能的拆分，解耦



#### 5：列表类组件的优化

列表循环渲染的时候添加key属性，增加key后，react就不是diff，而是直接使用insertBefore操作移动组件的位置，这个操作是移动DOM节点最高效的办法。



#### 6：bind函数

绑定this的方式一般有3种：

1. constructor绑定
2. 使用的时候使用bind函数绑定
3. 箭头函数

这三种方法第一种最优，第一种只在组件初始化的时候执行一次

第二种每次render的时候都会执行

第三种每一次render的时候都会生成一个新的箭头函数，所以每一次都会产生组件不必要的渲染



#### 7：react性能检测工具

1. react-addons-pref这是React官方推出的一个性能工具包，可以打印出组件渲染的时间，次数，浪费时间，API参照官网：https://reactjs.org/docs/perf.html
2. react16版本的方法，在url的后面加上 ”?react-pref“ ，就可以在chrome浏览器的performance中查看时间，User Timeing表示组件加载的时间，点击record开始记录，注意记录时长不要超过20s，否则可能导致chrome挂掉

#### 8：不要滥用props（例如：{...props}），使用ReactDOMServer进行服务端渲染

ReactDOMServer：https://react.docschina.org/docs/react-dom-server.html



#### 9：长列表优化

1. 懒加载
2. 根据滚动区域和可视区域长度计算页数，并在总页数中截条数

