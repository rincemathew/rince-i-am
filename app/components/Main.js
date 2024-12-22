"use client"
import addData from "../firebase/firestore/addData";
import React from 'react'

function Main() {
  const handleForm = async () => {
    const data = {
      name: "John Snow",
      house: "Stark",
    };
    const { result, error } = await addData("users", "user-id", data);

    if (error) {
      return console.log("Error adding data:", error);
    }

    console.log("Data added successfully:", result);
  };

  return (
    <>
      <div>main dev</div>
      <button onClick={handleForm}>Add Data</button>
    </>
  );

  // return (
  //   <div>main</div>
  // )
}

export default Main