import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Connect } from '@stacks/connect-react';
import { UserSession, AppConfig } from '@stacks/auth';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Institution from './pages/Institution';
import Student from './pages/Student';
import Admin from './pages/Admin';
import "./App.css";

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

function App() {
  return (
    <Connect userSession={userSession}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/institution" component={Institution} />
            <Route path="/student" component={Student} />
            <Route path="/admin" component={Admin} />
          </Switch>
          <Footer />
        </div>
      </Router>
    </Connect>
  );
}

export default App;
