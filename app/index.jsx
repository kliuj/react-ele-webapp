import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link,hashHistory ,IndexRedirect,IndexRoute,browserHistory} from 'react-router'

import Home from './components/home.jsx'
import Discover from './components/discover.jsx'
import Booklist from './components/booklist.jsx'
import User from './components/user.jsx'
import Detail from './components/detail.jsx'

const App = React.createClass({
  render() {
    return (
      <div>
        <footer>
        	<Link to="/home">外卖</Link>
        	<Link to="/discover">发现</Link>
        	<Link to="/booklist">订单</Link>
        	<Link to="/user">我的</Link>
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
      <Route path="booklist" component={Booklist} />
      <Route path="user" component={User} />
    </Route>
    <Route path="/detail/:id" component={Detail}></Route>
  </Router>
)

render(route, document.getElementById("app"))