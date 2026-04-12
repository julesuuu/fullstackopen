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
        <input
          style={{ marginLeft: "10px" }}
          type="date"
          value={newDiary.date}
          onChange={(e) => setNewDiary({ ...newDiary, date: e.target.value })}
        />
        <br />
        <label style={{ marginRight: "10px" }} htmlFor="visibility">
          visibility:
        </label>
        <label htmlFor="great">great</label>
        <input
          type="radio"
          name="visibility"
          id="great"
          value="great"
          checked={newDiary.visibility === "great"}
          onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
        />
        <label style={{ marginLeft: "10px" }} htmlFor="good">
          good
        </label>
        <input
          type="radio"
          name="visibility"
          id="good"
          value="good"
          checked={newDiary.visibility === "good"}
          onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
        />
        <label style={{ marginLeft: "10px" }} htmlFor="ok">
          ok
        </label>
        <input
          type="radio"
          name="visibility"
          id="ok"
          value="ok"
          checked={newDiary.visibility === "ok"}
          onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
        />
        <label style={{ marginLeft: "10px" }} htmlFor="poor">
          poor
        </label>
        <input
          type="radio"
          name="visibility"
          id="poor"
          value="poor"
          checked={newDiary.visibility === "poor"}
          onChange={(e) => setNewDiary({ ...newDiary, visibility: e.target.value as Visibility })}
        />
        <br />
        <label style={{ marginRight: "10px" }} htmlFor="weather">
          weather:
        </label>
        <label style={{ marginLeft: "10px" }} htmlFor="sunny">
          sunny
        </label>
        <input
          type="radio"
          name="weather"
          id="sunny"
          value="sunny"
          checked={newDiary.weather === "sunny"}
          onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
        />
        <label style={{ marginLeft: "10px" }} htmlFor="rainy">
          rainy
        </label>
        <input
          type="radio"
          name="weather"
          id="rainy"
          value="rainy"
          checked={newDiary.weather === "rainy"}
          onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
        />
        <label style={{ marginLeft: "10px" }} htmlFor="cloudy">
          cloudy
        </label>
        <input
          type="radio"
          name="weather"
          id="cloudy"
          value="cloudy"
          checked={newDiary.weather === "cloudy"}
          onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
        />
        <label style={{ marginLeft: "10px" }} htmlFor="stormy">
          stormy
        </label>
        <input
          type="radio"
          name="weather"
          id="stormy"
          value="stormy"
          checked={newDiary.weather === "stormy"}
          onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
        />
        <label style={{ marginLeft: "10px" }} htmlFor="windy">
          windy
        </label>
        <input
          type="radio"
          name="weather"
          id="windy"
          value="windy"
          checked={newDiary.weather === "windy"}
          onChange={(e) => setNewDiary({ ...newDiary, weather: e.target.value as Weather })}
        />
        <br />
        <label style={{ marginRight: "10px" }} htmlFor="comment">
          comment:
        </label>
        <input
          type="text"
          value={newDiary.comment}
          onChange={(e) => setNewDiary({ ...newDiary, comment: e.target.value })}
        />
        <br />
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
