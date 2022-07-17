import { BrowserRouter, Route } from "react-router-dom";
import User from "./User";
import Login from "./Login";
import Admin from "./Admin";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/user-dashboard" component={User} />
        <Route exact path="/admin-dashboard" component={Admin} />
      </BrowserRouter>
    </div>
  );
}

export default Router;
