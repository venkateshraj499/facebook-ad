import { BrowserRouter, Route } from "react-router-dom";
import User from "./User";
import Login from "./Login";

function Router() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route exact path="/user-dashboard" component={User} />
      </BrowserRouter>
    </div>
  );
}

export default Router;
