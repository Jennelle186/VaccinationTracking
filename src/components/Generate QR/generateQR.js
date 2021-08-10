import React, { useState } from "react";
import QRCode from "qrcode";
import {
  makeStyles,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@material-ui/core";
import ButtonForm from "./../Forms/Button/button";

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
  const [imgURL, setImgURL] = useState();

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL("text");
      console.log(response);
      setImgURL(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      Generate QR code
      <Container style={{ marginBottom: "1rem" }}>
        {imgURL ? (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={imgURL}
                // title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Name of the user here
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
