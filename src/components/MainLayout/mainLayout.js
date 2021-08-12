import React from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";

const MainLayout = (props) => {
  return (
    <div>
      <Header {...props} />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
