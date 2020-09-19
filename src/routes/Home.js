import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Aweet from "components/Aweet";
import AweetFactory from "components/AweetFactory";

const Home = ({ userObj }) => {
  const [aweets, setAweets] = useState([]);

  useEffect(() => {
    dbService.collection("aweets").onSnapshot((snapshot) => {
      const aweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAweets(aweetArray);
    });
  }, []);

  return (
    <div className="container">
      <AweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {aweets.map((aweet) => (
          <Aweet
            key={aweet.id}
            aweetObj={aweet}
            isOwner={aweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
