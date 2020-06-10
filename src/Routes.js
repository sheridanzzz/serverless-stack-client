import React from "react";
import { Route, Switch } from "react-router-dom";
import Signup from "./containers/Signup";
import ImageUpload from "./containers/ImageUpload";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import Home from "./containers/Home";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
	  <Route exact path="/login">
        <Login />
      </Route>
<<<<<<< HEAD
	  <Route exact path="/signup">
        <Signup />
      </Route>
	  <Route exact path="/ImageUpload">
        <ImageUpload />
      </Route>
=======
	  {/* Finally, catch all unmatched routes */}
>>>>>>> c947be6e6abc76c2fbe658378cf919349ab54779
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}