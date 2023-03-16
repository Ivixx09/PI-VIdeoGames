import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateGame from './components/CreateGame';
import { GameDetail } from './components/GameDetail';
import axios from "axios"
axios.defaults.baseURL = "http://localhost:3001/";
function App() {
  return (
  <BrowserRouter>
    <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/create' component={CreateGame}/>
          <Route exact path='/detail/:id' component={GameDetail}/>
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
