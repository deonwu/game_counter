import React from "react";
import {BrowserRouter, Route, Switch, Redirect} from "dva/router";

class AntFinReportEntry extends React.Component {
  render () {
    const match = this.props.match;
    
    return (
      <div>home </div>
    )
  }
}

function RouterConfig({ history }) {
  return (
    <div>
      <BrowserRouter>
        <Switch>
  
          <Route component={AntFinReportEntry} path="/counter" />
          
          <Redirect to="/counter" path="*" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default RouterConfig;
