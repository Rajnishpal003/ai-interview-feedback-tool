import Head from "next/head";
import AudioRecorder from "@/components/AudioRecorder"; // Using your alias path

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Interview Feedback Tool</title>
      </Head>
      <main style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "3rem" }}>
        <h1>AI Interview Feedback Tool</h1>
        <AudioRecorder />
      </main>
    </>
  );
}
