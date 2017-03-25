# react-ele-webapp
项目地址 ：https://github.com/kliuj/react-ele-webapp

## run 
下载完项目<br>
`npm install`<br>
然后<br>
`npm run dev` 即可 <br>
基于 `react  react-router  redux` 的项目，主要是为了学习实战`react`。数据都是固定的，从饿了么接口临时抓的，模拟了一个`0-100ms`的异步数据延迟，感谢饿了么。

以下内容是项目开发的过程和一些思考，按照这个过程至少能保证实现一个相对完整的`react`全家桶项目

## 内容参考

> `react`文档：http://reactjs.cn/react/docs/getting-started-zh-CN.html <br> 
> `react-router` 文档地址 :https://reacttraining.com/react-router/web/guides/quick-start <br> 
> `react-router` 中文版参考：http://www.uprogrammer.cn/react-router-cn/index.html <br> 
> `redux`文档参考：http://redux.js.org/ <br> 
> `redux`中文文档：http://cn.redux.js.org/ <br> 

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
```
    //接口对应的url，这里只做演示
    const uris = {
          index_entry : fetchData.index_entry,
          hot_search_words : fetchData.hot_search_words
    }
    //接口调用层
    export default function send(url,postData,successCallback,errCallback){
        //模拟延迟，假接口
        let promise = new Promise(function(resolve,reject){
            setTimeout(function(){
                resolve(fetchData[url])
            },Math.random()*100)
        })
        promise.then(function(data){
            successCallback(data)
        })
    }
```
>2:本地数据缓存维护：`baseStore.js`  主要处理页面之间的跳转返回，增加更多的自主性和扩展性
```
    // 自动存储浏览记录
    export function  saveFrom(prop) {
          let name = prop.pagename,
              transit =  prop.location,
              qhfrom = transit.query.qhfrom ,//默认全部返回首页
              para = transit.query.para ? JSON.parse(transit.query.para) : '';
          if(!qhfrom) return false;
          let paths  = localStorage.getItem("FromUrlStore") ? JSON.parse(localStorage.getItem("FromUrlStore")) : {};
          if (localStorage) {
            paths[name] = {
              'name':qhfrom,//存储来源页面
              'para':para //存储来源页面的参数
            }
            localStorage.setItem("FromUrlStore", JSON.stringify(paths));
          }
      }
   //存储页面的来源，统一管理   
```

>3:公共方法的处理:`baseFun.js`  主要用来定义一些公用的模块方法 
```
    //放置公用函数 
    export function showToast(){
        ...
    }
```   


## 使用react-router初始化页面
```
    import React from 'react'
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
     render(route, document.getElementById("app"))
```


代码简单介绍：
因为没有后台，采用的 `hashHistory` （`hash`路由），关于`hash`路由可以参考：https://github.com/kliuj/spa-routers 有简单的介绍。

    这个是router的跳转 <Link to="/home">外卖</Link>
    这个是加载子路由组件 {this.props.children}
    这个是默认的跳转页面 <IndexRoute component={Home} />
  

## 处理首页的滚动列表
首页主要分成了4个组件
底部导航 + 滚动列表 + 单个产品 + 首页搜索框
>滚动列表封装了一个简单的组件
```
    <List
        list={Pro}  //每个产品item组件
        pagename={'home'} //跳转产品列表的上级页面  用来处理返回
        data={this.state.productList} //需要渲染的数据
        onScroll = {this.getMore.bind(this)}//滚动加载函数
    />
    在scrollList组件里面监听了滚动事件进行自动加载的处理
```

## react-redux 处理登录和登出
使用redux的原因：用户信息和登录是两个不同的组件，也没有父子级的关系，但是需要进行数据状态共享和相互影响。详细信息可以看上面的官方文档，我这里就简单说一下我这个项目的应用。

>定义常量  `actionTypes.js`
```
    //登入成功
    export const LOG_SUCCESS = 'LOG_SUCCESS'
    //正在登录
    export const LOG_ING = 'LOG_ING'
    //注销登录
    export const LOG_OUT = 'LOG_OUT'
    //主要是统一保存状态对应的名称
```
>定义具体的触发操作 `actions/login.js`
```
    //注销 同步
    export function log_out (){
        return {
            type:actionTypes.LOG_OUT
        }
    }
    //登入 异步
    export function log_in (obj){
        return dispatch=>{
            //pending  正在进行登录的状态
            dispatch({type:actionTypes.LOG_ING})
            //开始发送异步请求登录
            new Promise((resolve,reject)=>{
                ...
            }).then(res=>{
                dispatch(res)
            })
        }
    }
    //异步状态需要使用中间件
```
>处理数据 `reducers/login.js`
```
    export default function(state = initialData,action){
        switch(action.type){
            case actionTypes.LOG_SUCCESS:
                return {
                    loginstate:1,
                    username:action.username
                }
                break
            case actionTypes.LOG_ING:
                return{
                    loginstate:-1,
                    username:'正在登录'
                }   
            case actionTypes.LOG_OUT:
                return initialData
                break
            default :
                return initialData  
        }
    }
```
>使用中间件创建store层  `store/store.js`
```
    import {createStore, applyMiddleware} from 'redux'
    import thunk from 'redux-thunk'
    //合并的多个reducer，解耦
    import rootReducer from '../reducers/index.js'
    const middlewares = [thunk]
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
    export default function configureStore(initialState){
        return createStoreWithMiddleware(rootReducer,initialState)
    }
```
>在路由层引入 
```
    import {Provider} from 'react-redux'
    const store = configureStore()
    const route = (
      <Provider store={store}>
          <Router history={hashHistory}>
              ...
          </Router>
      </Provider>
    )
```
>组件里面使用
```
    import { connect } from 'react-redux'
    import {log_out} from '../../actions/login.js' //操作
    ...
    ...
    function mapStateToProps(userinfo){
        let {login} = userinfo //这个是返回的所有reducer，我们只用当前需要的，参考 reducers/index.js 内容
        return login
    }
    export default connect(mapStateToProps)(UserInfo)
    //这个时候就可以在当前组件状态的  this.props 获取到这个 login 数据，
    //操作的时候  
    const {dispatch} = this.props;
    dispatch(log_out())
    //这时候就可以操作redux状态的数据，每次数据改变都会下发给所有接收的组件

```
## 以上，我们就使用了许多东西完成了一个简单的小项目
## future  server render 
