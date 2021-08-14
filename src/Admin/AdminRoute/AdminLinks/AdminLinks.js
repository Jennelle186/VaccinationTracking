import { Switch, Route } from "react-router-dom";
import AdminHome from "../../Pages/AdminHome/AdminHome";
import AnnouncementPage from "../../Pages/Announcement/AnnouncementPage";
import Users from "../../Pages/Users/Users";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Helvetica"].join(","),
  },
});

const AdminLinks = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path="/admin" render={() => <AdminHome />} />
          <Route
            exact
            path="/announcement"
            render={() => <AnnouncementPage />}
          />
          <Route exact path="/users" render={() => <Users />} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default AdminLinks;
