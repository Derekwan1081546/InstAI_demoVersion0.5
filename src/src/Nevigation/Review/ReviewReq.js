import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function ReviewReq() {
  //const { id, projectname } = useParams();
  const [reqData, setReqData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const projectname = searchParams.get("projectname");
  useEffect(() => {
    console.log("ReviewReq useEffect triggered");
    const fetchData = async () => {
      try {
        // fetchData
        const response = await axios.get(`http://localhost:8080/api/upload/getrequirement/?username=${id}&projectname=${projectname}`);
        const responseData = response.data.content;
        const parsedData = {};
        responseData.forEach(item => {
          const parsedItem = JSON.parse(`{${item}}`);
          Object.assign(parsedData, parsedItem);
        });
        console.log(parsedData);
        setReqData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, projectname]);

  /*const saveDataToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/upload/save-data', {
        username: id,
        projectname: projectname,
        data: reqData,
      });
      console.log('Data saved to backend:', response.data);
    } catch (error) {
      console.error('Error saving data to backend:', error);
    }
  };*/

  return (
    <div>
      <h2>Data Preview</h2>
      <div>
        {reqData.Requirement1 && (
        <>
          <p>Question 1: {reqData.Requirement1.question}</p>
          <p>Answer 1: {reqData.Requirement1.answer}</p>
        </>
        )}

        {reqData.Requirement2 && (
        <>
          <p>Question 2: {reqData.Requirement2.question}</p>
          <p>Answer 2: {reqData.Requirement2.answer}</p>
        </>
        )}
      </div>
    </div>

    // <div>
    //   <h2>Data Preview</h2>
    //   <div>
    //     <p>Question 1: {reqData.Requirement1.question}</p>
    //     <p>Answer 1: {reqData.Requirement1.answer}</p>

    //     <p>Question 2: {reqData.Requirement2.question}</p>
    //     <p>Answer 2: {reqData.Requirement2.answer}</p>
    //   </div>

     
    // </div>
  );
}

export default ReviewReq;
