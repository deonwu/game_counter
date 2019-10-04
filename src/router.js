import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "dva/router";

import MainFrame from "./routes/MainFrame";

function RouterConfig({ history }) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
  
          <Route component={MainFrame} path="/" />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default RouterConfig;
