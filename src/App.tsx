import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainWindow from './pages/mainWindow';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainWindow} />
      </Switch>
    </Router>
  );
}
