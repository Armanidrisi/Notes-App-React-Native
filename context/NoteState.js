import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = ({ children }) => {
  const API_ENDPOINT = "http://localhost:3000/notes";

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      if (!response.ok) {
        throw new Error(
          `Error fetching notes: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setNotes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes: ", error);
      alert(error);
      setLoading(false);
    }
  };

  const saveNote = async (title, content) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return true;
      } else {
        alert("Error while adding note");
        return false;
      }
    } catch (error) {
      console.error("Error while adding note: ", error);
      alert("Error while adding note");
      return false;
    }
  };

  const editNote = async (id, title, content) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await fetchNotes();
        return true;
      } else {
        alert("Error while editing note");
        return false;
      }
    } catch (error) {
      console.error("Error while editing note: ", error);
      alert("Error while editing note");
      return false;
    }
  };

  const deleteNote = async (id) => {
    //alert(id);
    try {
      const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchNotes();
        return true;
      } else {
        alert("Error while deleting note");
        return false;
      }
    } catch (error) {
      console.error("Error while deleting note: ", error);
      alert("Error while deleting note");
      return false;
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        fetchNotes,
        saveNote,
        editNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
