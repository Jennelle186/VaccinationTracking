import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { firestore } from "../../../Firebase/utils";
import SelectVaccine from "../SelectVaccine/selectVaccine";

const ChartWithSelect = () => {
  //for the vaccines-------------------------------------------------
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

  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);

  //--------------------------------------------------------------------

  //first dose - fever
  const [fever, setFever] = useState(0);
  useEffect(async () => {
    let ref = firestore.collection("users");
    if (selectedVaccine) {
      ref = ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("1.sideEffects1.Fever", "==", true);

      const query = await ref.get().then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
          });
        });

        setFever(arr.length);
      });
    }
  }, [selectedVaccine]);

  const [headache, setHeadache] = useState(0);
  useEffect(async () => {
    let ref = firestore.collection("users");
    if (selectedVaccine) {
      ref = ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("1.sideEffects1.Headache", "==", true);

      const query = await ref.get().then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
          });
        });

        setHeadache(arr.length);
      });
    }
  }, [selectedVaccine]);

  const [nausea, setNausea] = useState(0);
  useEffect(async () => {
    let ref = firestore.collection("users");
    if (selectedVaccine) {
      ref = ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("1.sideEffects1.Nausea", "==", true);

      const query = await ref.get().then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
          });
        });

        setNausea(arr.length);
      });
    }
  }, [selectedVaccine]);

  const [muscle, setMuscle] = useState(0);
  useEffect(async () => {
    let ref = firestore.collection("users");
    if (selectedVaccine) {
      ref = ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("1.sideEffects1.Muscle Pain", "==", true);

      const query = await ref.get().then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
          });
        });

        setMuscle(arr.length);
      });
    }
  }, [selectedVaccine]);

  //2nd dose---------------------------------------------------------------------
  const [fever2, setFever2] = useState(0);
  useEffect(async () => {
    let ref = firestore.collection("users");
    if (selectedVaccine) {
      ref = ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("2.sideEffects2.Fever", "==", true);

      const query = await ref.get().then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
          });
        });

        setFever2(arr.length);
      });
    }
  }, [selectedVaccine]);

  const [headache2, setHeadache2] = useState(0);
  useEffect(async () => {
    let ref = firestore.collection("users");
    if (selectedVaccine) {
      ref = ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("2.sideEffects2.Headache", "==", true);

      const query = await ref.get().then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
          });
        });

        setHeadache2(arr.length);
      });
    }
  }, [selectedVaccine]);

  const [nausea2, setNausea2] = useState(0);
  useEffect(async () => {
    let ref = firestore.collection("users");
    if (selectedVaccine) {
      ref = ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("2.sideEffects2.Nausea", "==", true);

      const query = await ref.get().then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
          });
        });

        setNausea2(arr.length);
      });
    }
  }, [selectedVaccine]);

  const [muscle2, setMuscle2] = useState(0);
  useEffect(async () => {
    let ref = firestore.collection("users");
    if (selectedVaccine) {
      ref = ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("2.sideEffects2.Muscle Pain", "==", true);

      const query = await ref.get().then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          arr.push({
            ...doc.data(),
          });
        });

        setMuscle2(arr.length);
      });
    }
  }, [selectedVaccine]);

  return (
    <div>
      <SelectVaccine
        value={selectedVaccine}
        onChange={handleChangeVaccine}
        vaccines={vaccines}
      />
      {selectedVaccine == "J&J" ? <h5>J&J does not have a 2nd dose</h5> : <></>}
      <div>
        <Bar
          data={{
            labels: ["Fever", "Headache", "Nausea", "Muscle Pain", "Others"],
            datasets: [
              {
                label: "1st Dose",
                data: [fever, headache, nausea, muscle],
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1,
              },
              {
                label: "2nd Dose",
                data: [fever2, headache2, nausea2, muscle2],
                backgroundColor: ["rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(255, 159, 64, 1)"],
                borderWidth: 1,
              },
            ],
          }}
          height={400}
          width={600}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: selectedVaccine,
              fontSize: 20,
            },
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
    </div>
  );
};

export default ChartWithSelect;
