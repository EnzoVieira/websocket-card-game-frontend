import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import { Dashboard } from "../Screens/Dashboard/Dashboard"
import { Mobile } from "../Screens/Mobile/Mobile"
import { TableGame } from "../Screens/TableGame/TableGame"

import { CoupTable } from "../Screens/CoupTable/CoupTable"
import { CoupMobile } from "../Screens/CoupMobile/CoupMobile"

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/table" component={TableGame} />
        <Route path="/mobile" component={Mobile} />

        <Route path="/coup/table" component={CoupTable} />
        <Route path="/coup/mobile" component={CoupMobile} />
      </Switch>
    </Router>
  )
}

export { Routes }
