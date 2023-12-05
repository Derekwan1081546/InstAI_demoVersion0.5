import React, { useState } from "react";
import axios from "axios"; 
import Prompt from "../../Components/Prompt/Prompt2";
import { NavLink, useLocation } from "react-router-dom";
import "./Requirment.css"
import InstAI_icon from "../../image/instai_icon.png";

function Requirement() {
  const [reqData, setReqData] = useState({
    req: "",
  });
  const [linktostep, setlinktostep] = useState(false);
  const [isDataChecked, setIsDataChecked] = useState(false); 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const projectname = searchParams.get('projectname');

  const handleFormDataChange = (fieldName, value) => {
    setReqData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
    if(fieldName !== ""){
      setlinktostep(true);
    }
    console.log(`Field ${fieldName} updated to:`, value);
  };

  const handleGenerateClick = async () => {
    if(reqData.req.trim() === ""){
      alert("requirements不可為空!");
    }
    else{
      const confirmed = window.confirm(`確定要提交嗎?\n\n將要提交的資料：\n${JSON.stringify(reqData, null, 2)}`);
      if (confirmed) {
        setIsDataChecked(true);
      }
    } 
  };

  // 提交到後端
  const handleSendData = async () => {
    const requestData = {
      method: "POST",
      request: reqData,
      question: "What is the type of location/environment that the AI model will be used?", 
      response: {
        message: "傳輸成功",
      },
    };
    try {
      const response = await axios.post(
        `http://localhost:8080/api/upload/requirement/?username=${id}&projectname=${projectname}`, 
        requestData
      ); //彥君要確認API正確
      console.log("server response:", response.data);
      alert("requirement 新增成功!");
      handleFormDataChange("req", "");
      setlinktostep(false);
      setIsDataChecked(false); // 重製數據檢查
    } catch (error) {
      console.error("提交失敗:", error);
      if (error.response) {
        alert(`提交失敗，錯誤狀態碼：${error.response.status}`);
      } else {
        alert("提交失敗，請檢查網絡連接或稍後重試。");
      }
    }
  };


  return (
    <div className="requirement-container">
    
    <div className="requirement-title-grid">
    <div className='requirement-InstAI-icon'>
            <img src={InstAI_icon} className='requirement-icon' alt="Your Logo" />
          </div>
    </div>

    <div className="requirement-grid-line"></div>
    

      <div className="requirement-form">
      <h2>Requirement</h2>
      <h3>Question1</h3>
      <p>What is the type of location/environment that the AI model will be used?</p>
      <div className="prompt">
      <Prompt text={''}  value={reqData.req} onChange={(value) => handleFormDataChange("req", value)}  /> 
      </div>
      <div className="button-group">

      {isDataChecked ? (
          <>
          {linktostep ? (
            <NavLink to={`/Step?id=${id}&project=${projectname}`}>
              <button onClick={handleSendData} className='submitButton'>提交</button>
            </NavLink>
          ) : (
            <button onClick={handleSendData} className='submitButton'>提交</button>
          )}
          </>
          ) : (
            <button onClick={handleGenerateClick} className='submitButton' >生成並檢查</button>
        )}
        
        <br/>
        <NavLink to={`/Step?id=${id}&project=${projectname}`}><button  className='BackPageButton'>返回前頁</button></NavLink>
      </div>
      </div>
     
    </div>
  );
}

export default Requirement;