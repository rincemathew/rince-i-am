"use client"
import addData from "../firebase/firestore/addData";
import React, { useEffect, useState } from 'react'

function Main() {

  const [userName, setUserName] = useState(localStorage.getItem('name') || 'noname');

  useEffect(()=>{
    console.log(userName)
    if(userName === 'noname') {
      const genarateName = Date.now().toString()
      localStorage.setItem('name',genarateName)
      setUserName(genarateName)
      addUserName(genarateName)
    }
  },[])


  //add username to database
  const addUserName = async (genarateName) => {
    const data = {
      guessed:"null",
      details:[]
    }
    const { result, error } = await addData("users", genarateName, data);
    if (error) {
      return console.log("Error adding UserName", error);
    }
    console.log("UserName added successfully", result);
  }


  // Push new item to details array

  //handle form
  // const handleForm = async () => {
  //   const data = {
  //     name: "Rinc",
  //     house: "ma",
  //   };
  //   const { result, error } = await addData("users", "user-id", data);

  //   if (error) {
  //     return console.log("Error adding data:", error);
  //   }

  //   console.log("Data added successfully:", result);
  // };

  return (
    <>
      <div>main dev</div>
      <button onClick={handleForm}>Add Data</button>
    </>
  );
}

export default Main