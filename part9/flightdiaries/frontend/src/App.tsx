import { useEffect, useState } from "react";
import type { Diary } from "./types";
import diaryService from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState("");

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);
  return (
    <div>
      <h2>Diary Entries</h2>
      <ul>
        {diaries?.map((diary) => (
          <li key={diary.id}>
            <h3>{diary.date}</h3>
            <p>visibility: {diary.visibility}</p>
            <p>weather: {diary.weather}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
