//sample bar chart from react-chart-js2
//this bar chart will be used for the side effects
import React from "react";
import { Bar } from "react-chartjs-2";

const state = {
  labels: ["Nausea", "Fever", "Muscle Pain"],
  datasets: [
    {
      label: "1st Dose",
      backgroundColor: "rgba(75,192,192,1)",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [65, 59, 80],
    },
    {
      label: "2st Dose",
      backgroundColor: "red",
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 2,
      data: [30, 20, 10],
    },
  ],
};

export default class Barchart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title: {
              display: true,
              text: "Average Rainfall per month",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}
