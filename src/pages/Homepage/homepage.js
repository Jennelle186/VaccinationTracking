//generate QR code and side effects is only temporary here so I can view the design of this
import ViewAnnouncement from "../../components/View Announcement/viewAnnouncement";
import AvailableVaccine from "../../components/AvailabilityVaccines/availableVaccine";

const Homepage = (props) => {
  return (
    <section>
      <br />
      <h1>Homepage</h1>

      <ViewAnnouncement />
      <AvailableVaccine />
    </section>
  );
};

export default Homepage;
