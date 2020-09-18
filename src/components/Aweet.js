import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Aweet = ({ aweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newAweet, setNewAweet] = useState(aweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this aweet?");

    if (ok) {
      await dbService.doc(`aweets/${aweetObj.id}`).delete();
      await storageService.refFromURL(aweetObj.attachmentUrl).delete();
    }
  };

  const toggleEditng = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`aweets/${aweetObj.id}`).update({
      text: newAweet,
    });
    setEditing(false);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewAweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              onChange={onChange}
              value={newAweet}
              placeholder="Edit your aweet"
              required
            />
            <input type="submit" value="Update Aweet" />
          </form>
          <button onClick={toggleEditng}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{aweetObj.text}</h4>
          {aweetObj.attachmentUrl && (
            <img src={aweetObj.attachmentUrl} width="200px" height="200px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Aweet</button>
              <button onClick={toggleEditng}>Edit Aweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Aweet;
