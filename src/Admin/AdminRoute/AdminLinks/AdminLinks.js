import { Switch, Route } from "react-router-dom";
import AdminHome from "../../Pages/AdminHome/AdminHome";
import AnnouncementPage from "../../Pages/Announcement/AnnouncementPage";
import ScanPage from "../../Pages/ScanQrCode/scanPage";
import Users from "../../Pages/Users/Users";
import AddVacinator from "../../Pages/VaccinatorName/vaccinatorPage";
import { AdminRoute } from "../../../Hooks/AdminRoute";

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
          <AdminRoute exact path="/admin" component={AdminHome} />
          <AdminRoute exact path="/announcement" component={AnnouncementPage} />
          <AdminRoute exact path="/users" component={Users} />
          <AdminRoute exact path="/scanQR-Code" component={ScanPage} />
          <AdminRoute exact path="/add-vaccinator" component={AddVacinator} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default AdminLinks;
