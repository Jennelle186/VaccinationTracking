import React, { useState } from "react";
import { Link } from "react-router-dom";
import QrReader from "react-qr-reader";
import { Grid, Container } from "@material-ui/core";
import Scan from "../Scan/scan";
import ButtonForm from "../../../components/Forms/Button/button";

const QrReaderComponent = () => {
  const [scanResult, setScanResult] = useState("");

  const handleErrorWebCam = (error) => {
    alert("error scan");
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResult(result);
    }
  };

  return (
    <div>
      <Link to="/admin">
        <ButtonForm style={{ float: "left" }}>Back</ButtonForm>
      </Link>

      {scanResult ? (
        <Grid item>
          <Scan scanResult={scanResult} />
        </Grid>
      ) : (
        <Container maxWidth="sm">
          <h1>Scanning</h1>

          <QrReader
            delay={300}
            style={{ width: "100%" }}
            onError={handleErrorWebCam}
            onScan={handleScanWebCam}
          />
          <h3>Scanned Result</h3>
          <Grid item>{scanResult} </Grid>
        </Container>
      )}
    </div>
  );
};

export default QrReaderComponent;
