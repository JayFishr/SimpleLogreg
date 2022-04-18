import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from './views/Main';
import Dashboard from './views/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Main/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
