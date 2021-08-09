import "./App.css";
import Header from "./components/Header/header";
import Homepage from "./pages/Homepage/homepage";
import LoginPage from "./pages/Login/login";
import Registration from "./pages/Registration/registration";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/registration" component={Registration} />
      </Switch>
    </div>
  );
}

export default App;
