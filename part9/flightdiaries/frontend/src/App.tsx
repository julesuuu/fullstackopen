import { useEffect, useState } from "react";
import type { Diary, NewDiary, Weather, Visibility } from "./types";
import diaryService from "./services/diaryService";
import axios from "axios";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiary>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then((initialDiaries) => {
      setDiaries(initialDiaries);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const returnedDiary = await diaryService.create(newDiary);
      setDiaries(diaries.concat(returnedDiary));

      setNewDiary({
        date: "",
        visibility: "",
        weather: "",
        comment: "",
      });
      setErrorMessage(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const data = error.response.data;

        if (data.error && Array.isArray(data.error)) {
          const messages = data.error.map((issue: { message: string }) => issue.message).join("\n");
          setErrorMessage(`Error: ${messages}`);
        }
        setTimeout(() => setErrorMessage(null), 5000);
      } else {
        setErrorMessage("Unknown error occurred");
        setTimeout(() => setErrorMessage(null), 5000);
      }
    }
  };
  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <h3 style={{ color: "red" }}> {errorMessage} </h3>}
      <form onSubmit={diaryCreation}>
        <label htmlFor="date">date:</label>
        <input type="text" value={newDiary.date} onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })} />
        <br />
        <label htmlFor="visibility">visibility:</label>
        <input
          type="text"
          value={newDiary.visibility}
          onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
        />
        <br />
        <label htmlFor="weather">weather:</label>
        <input
          type="text"
          value={newDiary.weather}
          onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
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
