import { Container, Box, Grid, Divider, Typography } from "@material-ui/core";

const Footer = (props) => {
  return (
    <footer>
      {/* not sure with these yet */}

      <Box
        padding="1rem"
        color="text.primary"
        bgcolor="#E3F2FD"
        marginTop=" 1rem"
      >
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            {/* change the sm={6} to sm{4} if it needs another section */}
            <Grid item xs={12} sm={4}>
              International Covid News
              <Divider style={{ width: "50%", margin: "0 auto" }} />
              {/* <Box borderBottom={1}>International Covid News</Box> */}
              <Box style={{ marginTop: "0.5rem" }}>
                <a
                  href="https://www.unicef.org/coronavirus/covid-19"
                  style={{ textDecoration: "none", color: "inherit" }}
                  target={"_blank"}
                >
                  Unicef
                </a>
              </Box>
              <Box>
                <a
                  href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019"
                  style={{ textDecoration: "none", color: "inherit" }}
                  target={"_blank"}
                >
                  World Health Organization
                </a>
              </Box>
            </Grid>

            {/* https://doh.gov.ph/Vaccines/What-you-can-safely-do-after-receiving-the-COVID-19-vaccine */}
            <Grid item xs={12} sm={4}>
              Local Covid News
              <Divider style={{ width: "50%", margin: "0 auto" }} />
              {/* <Box borderBottom={1}>Local Covid News</Box> */}
              <Box style={{ marginTop: "0.5rem" }}>
                <a
                  href="https://doh.gov.ph/"
                  style={{ textDecoration: "none", color: "inherit" }}
                  target={"_blank"}
                >
                  Department of Health Updates
                </a>
              </Box>
              <Box>
                <a
                  href="https://zamboangacity.gov.ph/category/news/"
                  style={{ textDecoration: "none", color: "inherit" }}
                  target={"_blank"}
                >
                  Zamboanga City News
                </a>
              </Box>
            </Grid>

            <Grid item xs={12} sm={4}>
              Contact Us
              <Divider style={{ width: "50%", margin: "0 auto" }} />
              <Box style={{ marginTop: "0.5rem" }}>+(63) 9530 452 140</Box>
              <Box></Box>
            </Grid>
          </Grid>
          <br />
          <br />
          AyalaVaccinationTracker &reg; {new Date().getFullYear()}
          {/* change name of the website here */}
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
