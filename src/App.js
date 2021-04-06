import React, { useState, useEffect } from "react";
import { useKeyPress } from "./hooks";
import { randomIndex, randomColor } from "./utilities";
import { lyrics } from "./data";
import styles from "./style.module.css";
import logo from "./assets/logo192.png";

function App() {
  const [lyricIndex, setLyricIndex] = useState(randomIndex(lyrics.length));

  const incrementLyricIndex = () => {
    setLyricIndex((lyricIndex) => lyricIndex + 1);
  };

  const decrementLyricIndex = () => {
    setLyricIndex((lyricIndex) => lyricIndex - 1);
  };

  useEffect(() => {
    const TEN_SECONDS_IN_MILLIS = 1000 * 10;
    const intervalId = setInterval(incrementLyricIndex, TEN_SECONDS_IN_MILLIS);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useKeyPress(incrementLyricIndex, "ArrowRight");
  useKeyPress(decrementLyricIndex, "ArrowLeft");

  const lyricSafeIndex = Math.abs(lyricIndex) % lyrics.length;
  const lyric = lyrics[lyricSafeIndex];

  const { line, song } = lyric;
  const delimitedLine = line.replace(/ /g, " / ");

  return (
    <>
      <body style={{ backgroundColor: randomColor() }}>
        <div className={styles.blondedWrapper}>
          <img src={logo} alt={"blonded logo"} />
        </div>
        <div className={styles.container}>
          <h1 className={styles.line}>“{delimitedLine}”</h1>
          <h2 className={styles.song}>{song}</h2>
        </div>
      </body>
    </>
  );
}

export default App;
