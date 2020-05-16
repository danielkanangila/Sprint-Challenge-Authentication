import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Container } from "./components/styled-components";
import PrivateRoute from "./components/PrivateRoute";
import Jokes from "./components/jokes/Jokes";
import Logout from "./components/auth/Logout";

function App() {
  return (
    <div className="app">
      <Switch>
        <Container>
          <PrivateRoute exact path="/" component={Jokes} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/logout" component={Logout} />
        </Container>
      </Switch>
    </div>
  );
}

export default App;
