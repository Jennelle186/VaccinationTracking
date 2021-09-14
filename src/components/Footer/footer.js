import {
  Container,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

const Footer = (props) => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <footer>
      {/* not sure with these yet */}
      {isMatch ? (
        <>1</>
      ) : (
        <>
          <Box
            // bgcolor="text.secondary"
            // color="white"
            padding="1rem"
            color="text.secondary"
            bgcolor="#E3F2FD"
            marginTop=" 1rem"
          >
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                {/* change the sm={6} to sm{4} if it needs another section */}
                <Grid item xs={12} sm={6}>
                  <Box borderBottom={1}>International Covid News</Box>
                  <Box>
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
                <Grid item xs={12} sm={6}>
                  <Box borderBottom={1}>Local Covid News</Box>
                  <Box>
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
              </Grid>
              {/* change name of the website here */}
              <Box
                textAlign="center"
                pt={{ xs: 5, sm: 10 }}
                pb={{ xs: 5, sm: 0 }}
              >
                AyalaVaccinationTracker &reg; {new Date().getFullYear()}
              </Box>
            </Container>
          </Box>
        </>
      )}
    </footer>
  );
};

export default Footer;
