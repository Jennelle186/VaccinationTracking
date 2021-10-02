import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { createMuiTheme, useTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Helvetica"].join(","),
  },
});

const MainLayout = (props) => {
  const theme = useTheme();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header {...props} />
        <div>{props.children}</div>
        <br />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default MainLayout;
