import Banner from "../../components/Layout/header2";
import ViewAnnouncement from "../../components/View Announcement/viewAnnouncement";
import AvailableVaccine from "../../components/AvailabilityVaccines/availableVaccine";
import PieGraph from "../../Admin/Components/Graph/pieGraph";
import { Card } from "@material-ui/core";

const Homepage = (props) => {
  return (
    <div>
      <Banner />
      <section>
        <br />
        <ViewAnnouncement />
        <AvailableVaccine />
        <Card style={{ padding: "1rem", margin: "1rem" }} elevation={10}>
          {" "}
          <PieGraph />
        </Card>
      </section>
    </div>
  );
};

export default Homepage;
