import { useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import MenuAppBar from './components/MenuAppBar';
import { PokemonDetails } from './components/PokemonDetails';
import PokemonFavorites from "./components/PokemonFavorites";
import PokemonList from './components/PokemonList';
function App() {
  const [bookmarksOnly, setBookmarksOnly] = useState(false);
  const setChangeBookMarksOnly = (e: any) => {
    setBookmarksOnly(e.target.checked);
  };
  return (
    <div className="flex flex-col justify-center">
      <MenuAppBar changeBookMarksOnly={setChangeBookMarksOnly}/>
      <Router>
        <Switch>
          <Route exact path="/">
            <PokemonList/>
          </Route>
            <Route path="/details/:name" children={<PokemonDetails />} />
          <Route exact path="/favorites">
            <PokemonFavorites/>
          </Route>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
