import { Switch, Route } from "react-router-dom";
import AdminHome from "../../Pages/AdminHome/AdminHome";
import AnnouncementPage from "../../Pages/Announcement/AnnouncementPage";
import Users from "../../Pages/Users/Users";

const AdminLinks = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/admin" render={() => <AdminHome />} />
        <Route exact path="/announcement" render={() => <AnnouncementPage />} />
        <Route exact path="/users" render={() => <Users />} />
      </Switch>
    </div>
  );
};

export default AdminLinks;
