### react v16.3之后废除的生命周期

#### componentWillMount

##### 首屏无数据导致白屏

许多开发者为了避免第一次渲染时页面因为没有获取到异步数据导致的白屏，而将数据请求的代码放在了componentWillMount中，希望可以避免白屏并提早异步请求发送时间；但实际上componentWillMount执行后，第一次渲染就已经开始了，所以不论在那里发送数据，都无法实际的解决这一问题，关于提早发送数据请求，官方建议放在constructor中，而不是componentWillMount； 

##### 事件订阅

在componentWillMount中订阅事件，并在componentWillUnmount中取消相应的事件订阅。但实际上react并不能够保证在componentWillMount调用后，同一组件的componentWillUnmount也会被调用。如果是服务端渲染时，componentWillUnmount是不会在服务端调用的，这样就会导致服务端内存泄漏；另一方面，在未来react开启异步渲染模式后，在componentWillMount被调用后，组件的渲染也可能会被其他事务所打断，导致componentWillUnmount不会被调用。但是componentDidMount调用后，一定会调用componentWillUnmount，并且根据代码清除掉组件中的订阅事件。



#### componentWillReceiveProps

在16.3之前的版本中，如果组件的某个state和props密切相关的话，一直都没有一种很优雅的方式去更新state，需要去componentWillReceiveProps中判断前后两个props是否相同，如果不同就更新state。这么做会破坏state的单一数据源，导致组件的状态变得不可预测，另一方面也会增加组件的重绘次数；

类似的业务需求也很多，例如一个Tab，本来是组件内部的状态，但会出现在组件外部进入时，需要根据传入的值跳转到特定的Tab；

在新版本中，react官方提供了一个更为简洁的生命周期函数

```
static getDerivedStateFromProps(nextProps, prevState);
// 一个简单的例子
// 修改之前
componentWillReceiveProps(nextProps){
	if(nextProps.translateX !== this.props.translateX){
		this.setState({
			translateX: nextProps.translateX
		})
	}
}

// 修改之后
static getDerivedFromProps(nextProps, prevState){
	if(nextProps.translateX !== prevState.translateX){
		return {
			translateX: nextProps.translateX,
		};
	}
	return null;
}
```

通常来讲，在componentwillReceiveProps中，我们一般会做两件事，一是根据props来更新state，二是执行一些回调函数；

在老版本中，这两件事是在componentwillReceiveProps中去做的，更新后，官方将更新state与触发回调重新分配到了getDerivedFromProps和componentDidUpdate中，是的组件的整体更新逻辑更为清晰。而在getDerivedFromProps中还禁止访问this.props，强制去比较nextProps和prevState，避免组件自身的状态变得不可预测



#### componentWillUpdate

##### 处理因为props改变带来的副作用

许多开发者会在componentWillUpdate中根据props的变化去触发一些回调，但是componentWillUpdate有可能在一次更新中被调用多次，就是说卸载componentWillUpdate的回调函数可能会被调用多次，而componentDidUpdate在一次更新中只会调用一次，所以将回调函数迁移至componentDidUpdate中就可以解决这个问题 



##### 在组件更新前读取DOM元素的状态

componentWillUpdate的另一个常见的用例就是在组件更新前，读取当前某个元素的状态，并在componentDidUpdate中进行处理，但是render和commit阶段之间不是完全的无缝衔接的，也就是说在componentDidUpdate中使用componentWillUpdate和中读取到的DOM元素可能已经更改失效



为了解决这个问题，react提供了一个新的生命周期函数

```
getSnapshotBeforeUpdate(prevProps, prevState)
```

与componentWillUpdate不同，getSnapshotBeforeUpdate会在最终的render之前被调用，就是说在getSnapshotBeforeUpdate中读取到的DOM一定是最新的，可以保证与componentDidUpdate中读取到的一致

我们应该尽量调用getSnapshotBeforeUpdate去返回一个值，然后在componentDidUpdate中去更新组件的状态，而不是直接在getSnapshotBeforeUpdate中更新组件的状态，示例代码如下：

```javascript
class ScrollingList extends React.Component {
  listRef = null;

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevProps.list.length < this.props.list.length) {
      return (
        this.listRef.scrollHeight - this.listRef.scrollTop
      );
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // If we have a snapshot value, we've just added new items.
    // Adjust scroll so these new items don't push the old ones out of view.
    // (snapshot here is the value returned from getSnapshotBeforeUpdate)
    if (snapshot !== null) {
      this.listRef.scrollTop =
        this.listRef.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.setListRef}>
        {/* ...contents... */}
      </div>
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}
```

