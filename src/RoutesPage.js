import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import InboxPage from './InboxPage'
import TaskPage from './TaskPage'

export default function RoutesPages() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/task" component={TaskPage} exact />
        <Route path="/inbox" component={InboxPage} exact />
      </Switch>
    </BrowserRouter>
  )
}