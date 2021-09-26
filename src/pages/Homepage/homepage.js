import ViewAnnouncement from "../../components/View Announcement/viewAnnouncement";
import AvailableVaccine from "../../components/AvailabilityVaccines/availableVaccine";

const Homepage = (props) => {
  return (
    <section>
      <br />
      <ViewAnnouncement />
      <AvailableVaccine />
    </section>
  );
};

export default Homepage;
