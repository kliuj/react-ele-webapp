import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link,hashHistory ,IndexRedirect} from 'react-router'

import Home from './components/home.jsx'
import Discover from './components/discover.jsx'
import Booklist from './components/booklist.jsx'
import User from './components/user.jsx'

const App = React.createClass({
  render() {
    return (
      <div>
        <footer>
        	<a href="/#home">外卖</a>
        	<a href="/#discover">发现</a>
        	<a href="/#booklist">订单</a>
        	<a href="/#user">我的</a>
        </footer>
        {this.props.children}
      </div>
    )
  }
})


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Route path="discover" component={Discover} />
      <Route path="booklist" component={Booklist} />
      <Route path="user" component={User} />
    </Route>
  </Router>
), document.getElementById("app"))