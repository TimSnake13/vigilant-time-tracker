import Head from "next/head";
import React, { useState } from "react";
import Calender from "../src/components/Calender";
import { TrackingData } from "../src/components/Calender/types";

const calender = () => {
  const [savedTrackingDataArray, setSavedTrackingDataArray] = useState<
    TrackingData[]
  >([]);

  const updateTrackingData = (newData: TrackingData) => {
    setSavedTrackingDataArray(
      savedTrackingDataArray.map((data) =>
        data.id === newData.id ? newData : data
      )
    );
  };

  return (
    <div>
      <Head>
        <title>Daily Habit Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Calender savedTrackingDataArray={savedTrackingDataArray} />
        <div className="mt-10">
          <Habits
            savedTrackingDataArray={savedTrackingDataArray}
            updateTrackingData={updateTrackingData}
          />
        </div>
      </main>

      <footer></footer>
    </div>
  );
};

export default calender;
