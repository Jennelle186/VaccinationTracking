import React, { useState } from "react";
import QRCode from "qrcode";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@material-ui/core";
import ButtonForm from "./../Forms/Button/button";
import GetAppIcon from "@material-ui/icons/GetApp";
import { useSelector } from "react-redux";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: "0 auto",
    marginBottom: "1rem",
  },
  media: {
    height: 400,
  },
});

const GenerateQR = (props) => {
  const classes = useStyles();
  const { currentUser } = useSelector(mapState);
  const [imgURL, setImgURL] = useState();
  const name =
    currentUser.firstName +
    " " +
    currentUser.middleName +
    " " +
    currentUser.lastName;

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(currentUser.id);
      console.log(response);
      setImgURL(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container style={{ marginBottom: "1rem" }}>
        {/* <ButtonForm startIcon={<GetAppIcon />}>Download</ButtonForm> */}
        <br />

        {imgURL ? (
          <a href={imgURL} download>
            <img src={imgURL} alt="img" />{" "}
          </a>
        ) : null}

        {imgURL ? (
          <Card className={classes.root} elevation={5}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={imgURL}
                // title="Contemplative Reptile"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  You may show your QR Code to complete your vaccination
                </Typography>
              </CardContent>
            </CardActionArea>
            {/* <CardActions></CardActions> */}
          </Card>
        ) : null}

        <ButtonForm onClick={() => generateQrCode()}>Show QR Code</ButtonForm>
      </Container>
    </div>
  );
};

export default GenerateQR;
