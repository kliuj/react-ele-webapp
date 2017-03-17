import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link,hashHistory ,IndexRedirect,IndexRoute} from 'react-router'
import {Provider} from 'react-redux'


import Home from './components/home.jsx'
import Discover from './components/discover.jsx'
import Booklist from './components/booklist.jsx'
import User from './components/user.jsx'
import Detail from './components/detail.jsx'
import configureStore from './store/store.js'

const App = React.createClass({
  render() {
    return (
      <div>
        <footer>
        	<Link to="/home">外卖</Link>
        	<Link to="/discover?qhfrom=home">发现</Link>
        	<Link to="/booklist?qhfrom=home">订单</Link>
        	<Link to={{pathname:'user',query:{ qhfrom : "home"}, hash:'#user',}}>我的</Link>
        </footer>
        {this.props.children}
      </div>
    )
  }
})

const store = configureStore()

const route = (
  <Provider store={store}>
      <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="home" component={Home} />
            <Route path="discover" component={Discover} />
            <Route path="booklist" component={Booklist} />
            <Route path="user" component={User} />
          </Route>
          <Route path="/detail/:id"  component={Detail}></Route>
      </Router>
  </Provider>
)

render(route, document.getElementById("app"))
