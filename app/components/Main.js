"use client"
import addData from "../firebase/firestore/addData";
import React, { useEffect, useState } from 'react'
import { getDoc, doc, updateDoc } from "firebase/firestore"; // Add these Firebase imports
import { db } from "../firebase/config"; // Ensure you have a properly exported Firestore

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

  useEffect(()=>{
    const timeStamp = Date.now().toString()
    // const detailedDevice = navigator.userAgentData
    const detailedDevice = navigator.userAgentData
      ? {
          brands: navigator.userAgentData.brands,
          mobile: navigator.userAgentData.mobile,
          platform: navigator.userAgentData.platform
        }
      : navigator.userAgent; 
    pushToDetails({timeStamp, detailedDevice})
  },[])


  // Push new item to details array
  const pushToDetails = async (param) => {
    try {
      const userDocRef = doc(db, "users", userName);
      console.log(db,"users",userName,+"aaaaa")
      const userDoc = await getDoc(userDocRef);
      console.log(JSON.stringify(userDoc.data().details,null,2)+"bbbbbbbbbbbbbbbb")

      if (userDoc.exists()) {
        const currentDetails = userDoc.data().details || [];
        const newItem = param; // Example new item
        const updatedDetails = [...currentDetails, newItem];
        console.log(updatedDetails)

        await updateDoc(userDocRef, { details: updatedDetails });
        console.log("Details updated successfully:", updatedDetails);
      } else {
        console.log("User document does not exist!");
      }
    } catch (error) {
      console.log("Error updating details:", error);
    }
  };

  return (
    <>
      <div>main dev</div>
      {/* <button onClick={handleForm}>Add Data</button> */}
    </>
  );
}

export default Main