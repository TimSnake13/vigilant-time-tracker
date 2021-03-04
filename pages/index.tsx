import Head from "next/head";
import React from "react";
import TasksTracker from "../src/components/TasksTracker";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Actively Track Your Time Spend</h1>

        <TasksTracker />
      </main>

      <footer></footer>
    </div>
  );
}
