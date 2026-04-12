import { useEffect, useState } from "react";
import type { Diary, NewDiary } from "./types";
import diaryService from "./services/diaryService";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    diaryService.create(newDiary).then((returnedDiary) => {
      setDiaries(diaries.concat(returnedDiary));
    });
    setNewDiary({
      date: "",
      visibility: "",
      weather: "",
      comment: "",
    });
  };
  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <label htmlFor="date">date:</label>
        <input type="text" value={newDiary.date} onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })} />
        <br />
        <label htmlFor="visibility">visibility:</label>
        <input
          type="text"
          value={newDiary.visibility}
          onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value })}
        />
        <br />
        <label htmlFor="weather">weather:</label>
        <input
          type="text"
          value={newDiary.weather}
          onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value })}
        />
        <br />
        <label htmlFor="comment">comment:</label>
        <input
          type="text"
          value={newDiary.comment}
          onChange={(e) => setNewDiary({ ...newDiary, comment: e.target.value })}
        />
        <button type="submit">add</button>
      </form>
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
