import "./App.css";
import Header from "./components/Header/header";
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/Login/login";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={LoginPage} />
      </Switch>
    </div>
  );
}

export default App;
