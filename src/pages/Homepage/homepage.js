import Banner from "../../components/Layout/header2";
import ViewAnnouncement from "../../components/View Announcement/viewAnnouncement";
import AvailableVaccine from "../../components/AvailabilityVaccines/availableVaccine";

const Homepage = (props) => {
  return (
    <div>
      <Banner />
      <section>
        <br />
        <ViewAnnouncement />
        <AvailableVaccine />
      </section>
    </div>
  );
};

export default Homepage;
