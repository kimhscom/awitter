import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [aweet, setAweet] = useState("");
  const [aweets, setAweets] = useState([]);

  const getAweets = async () => {
    const dbAweets = await dbService.collection("aweets").get();

    dbAweets.forEach((document) => {
      const aweetObject = {
        ...document.data(),
        id: document.id,
      };

      setAweets((prev) => [aweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getAweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("aweets").add({
      aweet,
      createdAt: Date.now(),
    });
    setAweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setAweet(value);
  };

  console.log(aweets);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          value={aweet}
          maxLength={120}
          placeholder="What's on your mind"
        />
        <input type="submit" value="Aweet" />
      </form>
      <div>
        {aweets.map((aweet) => (
          <div key={aweet.id}>
            <h4>{aweet.aweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
