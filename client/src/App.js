import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Components/Home/Home';
import LandingPage from './Components/LandingPage/LandingPage';
import DogCreate from './Components/DogCreate/DogCreate';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/dogs' component={DogCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
