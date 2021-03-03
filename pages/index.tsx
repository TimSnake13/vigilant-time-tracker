import Head from "next/head";
import React from "react";
import TasksTracker from "../src/components/TasksTracker";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <TasksTracker />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
