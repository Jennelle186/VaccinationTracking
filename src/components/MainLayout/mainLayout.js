import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { createMuiTheme, useMediaQuery, useTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Helvetica"].join(","),
  },
});
const MainLayout = (props) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header {...props} />

        <div>{props.children}</div>
        <Footer />

        {/* {isMatch ? <></> : <Footer />} */}
      </ThemeProvider>
    </div>
  );
};

export default MainLayout;
