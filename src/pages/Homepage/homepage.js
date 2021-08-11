//generate QR code and side effects is only temporary here so I can view the design of this
import GenerateQR from "../../components/Generate QR/generateQR";
import SideEffects from "../../components/vaccinationSideEffects/SideEffects";
import Profile from "../../components/Profile/profile";

const Homepage = (props) => {
  return (
    <section>
      <br />
      <h1>Homepage</h1>

      {/* <GenerateQR /> */}
      {/* <SideEffects /> */}
      <Profile />
    </section>
  );
};

export default Homepage;
