import { Switch, Route } from "react-router-dom";
import AdminHome from "../../Pages/AdminHome/AdminHome";

const AdminLinks = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/admin" render={() => <AdminHome />} />
      </Switch>
    </div>
  );
};

export default AdminLinks;
