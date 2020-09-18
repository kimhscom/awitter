import React, { useState } from "react";

const Home = () => {
  const [aweet, setAweet] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
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
