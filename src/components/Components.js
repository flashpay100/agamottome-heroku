import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Signin from "./auth-component/SignIn.js"
import Signup from "./auth-component/SignUp.js"
import Books from "./user-component/Books.js"
import Library from "./user-component/Library.js"
import Profile from "./user-component/Profile.js"
import Dashboard from "./admin-component/Dashboard.js"
import RevokedList from "./admin-component/RevokedList"
import Error from "./global-component/Error.js"

export default function Components() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/library" component={Library} />
            <Route path="/books" component={Books} />
            <Route path="/profile" component={Profile} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/revokedlist" component={RevokedList} />
            <Route path="*" component={Error} />
          </Switch>
        </Router>
      </div>
    )
}