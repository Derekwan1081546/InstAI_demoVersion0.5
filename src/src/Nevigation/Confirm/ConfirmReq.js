// ConfirmReq.js

import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ConfirmSTR.css'; // Import the CSS file
import InstAI_icon from '../../image/instai_icon.png';

function ConfirmReq() {
  const [reqData, setReqData] = useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const projectname = searchParams.get('projectname');
  const [confirm2Data, setConfirm2Data] = useState(localStorage.getItem('confirmStatusImg') === 'true');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/upload/getrequirement/?username=${id}&projectname=${projectname}`
        );
        const responseData = response.data.content;
        const parsedData = {};
        responseData.forEach(item => {
          const parsedItem = JSON.parse(`{${item}}`);
          Object.assign(parsedData, parsedItem);
        });
        setReqData(parsedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id, projectname]);

  const handleFormDataChange = () => {
    setConfirm2Data((prevData) => {
      const newConfirm2Data = !prevData;
      localStorage.setItem('confirmStatusReq', newConfirm2Data.toString());
      return newConfirm2Data;
    });
    console.log('Button clicked. Confirm is now:', confirm2Data);
  };

  return (
    <div className="review-container">
      <div className="main-InstAI-icon">
        <img src={InstAI_icon} className="logo" alt="Your Logo" />
      </div>
      <div className="data-preview">
        <h2>Data Preview</h2>
        <div className="questions-answers">
          {reqData.Requirement1 && (
            <div className="question-answer">
              <p>Question 1: {reqData.Requirement1.question}</p>
              <p>Answer : {reqData.Requirement1.answer}</p>
            </div>
          )}

          {reqData.Requirement2 && (
            <div className="question-answer">
              <p>Question 2: {reqData.Requirement2.question}</p>
              <p>Answer : {reqData.Requirement2.answer}</p>
            </div>
          )}
        </div>
      </div>
      <button onClick={handleFormDataChange}>{confirm2Data ? '確認' : '取消確認'}</button>
      <NavLink to={`/Step?id=${id}&project=${projectname}`}>
          <button>Go Back</button>
      </NavLink>
      <NavLink to={`/Requirment?id=${id}&projectname=${projectname}`}>
        <button >Change Requirement</button>
        </NavLink>
      
    </div>
  );
}

export default ConfirmReq;
