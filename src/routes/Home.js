import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [aweet, setAweet] = useState("");

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
    </div>
  );
};

export default Home;
