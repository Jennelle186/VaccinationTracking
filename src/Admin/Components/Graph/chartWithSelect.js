import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { firestore } from "../../../Firebase/utils";
import SelectVaccine from "../SelectVaccine/selectVaccine";

const ChartWithSelect = () => {
  //for the vaccines-------------------------------------------------
  const [vaccines, setVaccines] = useState([]);

  const [selectedVaccine, setSelectedVaccine] = useState(0);
  const handleChangeVaccine = (e) => setSelectedVaccine(e.target.value);
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

  //------------------1st Dose--------------------------------------------------
  const [fever, setFever] = useState(0);
  const [headache, setHeadache] = useState(0);
  const [nausea, setNausea] = useState(0);
  const [muscle, setMuscle] = useState(0);
  //------------------2nd Dose--------------------------------------------------
  const [fever2, setFever2] = useState(0);
  const [headache2, setHeadache2] = useState(0);
  const [nausea2, setNausea2] = useState(0);
  const [muscle2, setMuscle2] = useState(0);

  useEffect(() => {
    let mounted = true;

    // move these in here so they have access to `mounted`
    const getData1 = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("1.sideEffects1.Fever", "==", true)
        .get();

      if (mounted) {
        setFever(snapshot.size);
      }
    };

    const getData2 = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("1.sideEffects1.Headache", "==", true)
        .get();

      if (mounted) {
        setHeadache(snapshot.size);
      }
    };

    const getData3 = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("1.sideEffects1.Nausea", "==", true)
        .get();

      if (mounted) {
        setNausea(snapshot.size);
      }
    };

    const getData4 = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("1.sideEffects1.Muscle Pain", "==", true)
        .get();

      if (mounted) {
        setMuscle(snapshot.size);
      }
    };

    //---------------------------------------------------------------------------------
    const getData5 = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("2.sideEffects2.Fever", "==", true)
        .get();

      if (mounted) {
        setFever2(snapshot.size);
      }
    };

    const getData6 = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("2.sideEffects2.Headache", "==", true)
        .get();

      if (mounted) {
        setHeadache2(snapshot.size);
      }
    };

    const getData7 = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("2.sideEffects2.Nausea", "==", true)
        .get();

      if (mounted) {
        setNausea2(snapshot.size);
      }
    };

    const getData8 = async () => {
      const ref = firestore.collection("users");
      const snapshot = await ref
        .where("doses.selectedVaccine", "==", selectedVaccine)
        .where("2.sideEffects2.Muscle Pain", "==", true)
        .get();

      if (mounted) {
        setMuscle2(snapshot.size);
      }
    };

    //--------------------------------------------------------------------------

    if (selectedVaccine) {
      getData1();
      getData3();
      getData2();
      getData4();
      getData5();
      getData6();
      getData7();
      getData8();
    }

    return () => {
      // avoid calling a state setter on an unmounted component
      mounted = false;
    };
  }, [selectedVaccine]);

  //2nd dose---------------------------------------------------------------------

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
