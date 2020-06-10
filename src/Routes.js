import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./containers/Signup";
import ImageUpload from "./containers/ImageUpload";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Home from "./containers/Home";
import Results from "./containers/Results";
import Search from "./containers/Search";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
	  <Route exact path="/login">
        <Login />
      </Route>
	  <Route exact path="/signup">
        <Signup />
      </Route>
	  <Route exact path="/ImageUpload">
        <ImageUpload />
      </Route>
	  <Route exact path="/Search">
        <Search />
      </Route>
	  <Route exact path="/Results">
        <Results />
      </Route>
	  {/* Finally, catch all unmatched routes */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}