import React, { useState, useEffect } from "react";
import { firestore } from "../../../Firebase/utils";
import { Bar } from "react-chartjs-2";

const VaccineGraph = () => {
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("vaccines")
      .onSnapshot((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) =>
          arr.push({
            ...doc.data(),
            id: doc.id,
          })
        );
        setVaccines(arr);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  // const [size, setSize] = useState(0);

  //AstraZeneca - at least 1 dose
  const [astra1, setAstra1] = useState(0);
  useEffect(async () => {
    const ref = firestore.collection("users");
    const snapshot = await ref
      .where("doses.selectedVaccine", "==", "AstraZeneca")
      .where("doses.dose1", "==", true)
      .where("doses.dose2", "==", false)
      .onSnapshot((snap) => {
        setAstra1(snap.size);
      });
  }, []);

  //AstraZeneca - fully vaccinated
  const [astraSize, setAstraSize] = useState(0);

  useEffect(async () => {
    const ref = firestore.collection("users");
    const snapshot = await ref
      .where("doses.selectedVaccine", "==", "AstraZeneca")
      .where("doses.dose1", "==", true)
      .where("doses.dose2", "==", true)
      .onSnapshot((snap) => {
        setAstraSize(snap.size);
      });
  }, []);

  //sinovac at least 1 dose
  const [sinovac, setSinovac] = useState(0);
  useEffect(async () => {
    const ref = firestore.collection("users");
    const snapshot = await ref
      .where("doses.selectedVaccine", "==", "Sinovac")
      .where("doses.dose1", "==", true)
      .where("doses.dose2", "==", false)
      .onSnapshot((snap) => {
        setSinovac(snap.size);
      });
  }, []);

  //sinovac fully vaccinated
  const [sino2, setSino2] = useState(0);
  useEffect(async () => {
    const ref = firestore.collection("users");
    const snapshot = await ref
      .where("doses.selectedVaccine", "==", "Sinovac")
      .where("doses.dose1", "==", true)
      .where("doses.dose2", "==", true)
      .onSnapshot((snap) => {
        setSino2(snap.size);
      });
  }, []);

  return (
    <div>
      <Bar
        data={{
          labels: ["AstraZeneca", "Sinovac"],
          datasets: [
            {
              label: "At least 1 dose",
              data: [astra1, sinovac],
              backgroundColor: ["rgba(255, 99, 132, 0.2)"],
              borderColor: ["rgba(255, 99, 132, 1)"],
              borderWidth: 1,
            },
            {
              label: "Fully Vaccinated",
              data: [astraSize, sino2],
              backgroundColor: "orange",
              borderColor: "red",
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
};

export default VaccineGraph;
