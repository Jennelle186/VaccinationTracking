import Banner from "../../components/Layout/header2";
import ViewAnnouncement from "../../components/View Announcement/viewAnnouncement";
import AvailableVaccine from "../../components/AvailabilityVaccines/availableVaccine";
import PieGraph from "../../Admin/Components/Graph/pieGraph";
import chartWithSelect from "../../Admin/Components/Graph/chartWithSelect";
import { Card, Grid } from "@material-ui/core";
import ChartWithSelect from "../../Admin/Components/Graph/chartWithSelect";

const Homepage = (props) => {
  return (
    <div>
      <Banner />
      <section>
        <br />

        {/* <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card style={{ padding: "1rem", margin: "1rem" }} elevation={10}>
              <ViewAnnouncement />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card style={{ padding: "1rem", margin: "1rem" }} elevation={10}>
              <AvailableVaccine />
            </Card>
          </Grid>
        </Grid> */}

        <ViewAnnouncement />
        <AvailableVaccine />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Card style={{ padding: "1rem", margin: "1rem" }} elevation={10}>
              <PieGraph />
            </Card>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Card style={{ padding: "1rem", margin: "1rem" }} elevation={10}>
              <ChartWithSelect />
            </Card>
          </Grid>
        </Grid>
      </section>
    </div>
  );
};

export default Homepage;
