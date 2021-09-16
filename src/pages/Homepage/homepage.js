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
