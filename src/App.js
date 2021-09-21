import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PathFindingVisualizerScreen from "./Screens/PathFindingVisualizerScreen";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import NavBar from "./navbar/navbar.jsx";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
      <Route exact path="/" component={SortingVisualizer} />
        <Route exact path="/pathFinding" component={PathFindingVisualizerScreen} />
      </Switch>
    </Router>
  );
}

export default App;
