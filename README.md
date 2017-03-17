# react-ele-webapp
===============
业余时间完成基于 `react  react-router  redux` 的项目，主要是为了学习实战`react`。数据都是固定的，从饿了么接口临时抓的，模拟了一个`0-100ms`的异步数据延迟，感谢饿了么。

以下内容是项目开发的过程和一些思考，按照这个过程至少能保证实现一个相对完整的`react`全家桶项目

## 内容参考

> `react`文档：http://reactjs.cn/react/docs/getting-started-zh-CN.html \<br> 
> `react-router` 文档地址 :https://reacttraining.com/react-router/web/guides/quick-start \<br> 
> `react-router` 中文版参考：http://www.uprogrammer.cn/react-router-cn/index.html \<br> 
> `redux`文档参考：http://redux.js.org/ \<br> 
> `redux`中文文档：http://cn.redux.js.org/ \<br> 

## 搭建项目:
建立项目目录，安装package.json，配置webpack.config
做好基础依赖工作，摘自package.json的一部分内容	
```
    "devDependencies": {
        "babel-core": "^6.23.1",
        "babel-loader": "^6.4.0",
        "babel-preset-es2015": "^6.22.0",
        "babel-preset-react": "^6.23.0",
        "html-webpack-plugin": "^2.28.0",
        "jshint": "^2.9.4",
        "jshint-loader": "^0.8.4",
        "react": "^15.2.0",
        "react-dom": "^15.2.0",
        "react-router": "^2.0.0",
        "redux": "^3.6.0",
        "webpack": "^2.2.1",
        "webpack-dev-server": "^2.4.1"
    } //JAVASCRIPT
```

## 项目模块结构组织一些基础工作
开始进行开发一个项目除了技术选型之外，还有许多基础东西要先设计好，一个好的组织设计要可以为以后的提高工作效率。我这方面还有很多欠缺，目前主要考虑了3个模块的设计：
>1:后台接口通信层：`model.js`  主要处理统一接口的请求发送和回调，放在一起更有利于后期维护，也增加可阅读性
>2:本地数据缓存维护：`baseStore.js`  主要处理页面之间的跳转返回，增加更多的自主性和扩展性
>3:公共方法的处理:`baseFun.js`  主要用来定义一些公用的模块方法    

## 使用react-router初始化页面
>
       ``` import React from 'react'
                             import { render } from 'react-dom'
                             import { Router, Route, Link,hashHistory ,IndexRedirect,IndexRoute} from 'react-router'
                             import Home from './components/home.jsx'
                             import Discover from './components/discover.jsx'
                             const App = React.createClass({
                               render() {
                                 return (
                                   <div>
                                     <footer>
                                         <Link to="/home">外卖</Link> 
                                         <Link to="/discover?qhfrom=home">发现</Link>
                                     </footer>
                                     {this.props.children}
                                   </div>
                                 )
                               }
                             })
                             const route = (
                                  <Router history={hashHistory}>
                                     <Route path="/" component={App}>
                                       <IndexRoute component={Home} />
                                       <Route path="home" component={Home} />
                                       <Route path="discover" component={Discover} />
                                     </Route>
                                   </Router>
                             )
                             render(route, document.getElementById("app"))```
代码简单介绍：
因为没有后台，采用的 `hashHistory` （`hash`路由），关于`hash`路由可以参考：https://github.com/kliuj/spa-routers 有简单的介绍。

    这个是router的跳转  ```<Link to="/home">外卖</Link>``` 
    这个是加载子路由组件 ```{this.props.children}```
    这个是默认的跳转页面 ```<IndexRoute component={Home} />```
  

## 处理首页的滚动列表
首页主要分成了4个组件
底部导航 + 滚动列表 + 单个产品 + 首页搜索框