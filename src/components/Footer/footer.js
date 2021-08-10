import { Container, Box, Grid } from "@material-ui/core";

const Footer = (props) => {
  return (
    <footer>
      <Box
        // bgcolor="text.secondary"
        // color="white"
        padding="1rem"
        color="text.secondary"
        bgcolor="#E3F2FD"
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>Contactt</Box>
              <Box>Support</Box>
              <Box>Privacy</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Help</Box>
              <Box>Contactt</Box>
              <Box>Support</Box>
              <Box>Privacy</Box>
            </Grid>
          </Grid>
          {/* change name of the website here */}
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Website &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
