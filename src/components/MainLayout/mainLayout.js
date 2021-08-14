import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Helvetica"].join(","),
  },
});
const MainLayout = (props) => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header {...props} />
        <div>{props.children}</div>
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default MainLayout;
