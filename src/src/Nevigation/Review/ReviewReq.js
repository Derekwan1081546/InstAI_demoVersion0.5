import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReviewReq() {
  const { id, projectname } = useParams();
  const [reqData, setReqData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取数据
        const response = await axios.get(`http://localhost:8080/api/upload/requirement/?username=${id}&projectname=${projectname}`);
        setReqData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, projectname]);

  const saveDataToBackend = async () => {
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
  };

  return (
    <div>
      <h2>Data Preview</h2>
      <div>
        <p>Question 1: {reqData.Requirement1?.question}</p>
        <p>Answer 1: {reqData.Requirement1?.answer}</p>

        <p>Question 2: {reqData.Requirement2?.question}</p>
        <p>Answer 2: {reqData.Requirement2?.answer}</p>
      </div>

      <button onClick={saveDataToBackend}>Save Data to Backend</button>
    </div>
  );
}

export default ReviewReq;