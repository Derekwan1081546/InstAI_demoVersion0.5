import React from 'react';
import './Step.css';
import InstAI_icon from "../../image/instai_icon.png";
import { NavLink, useLocation } from 'react-router-dom';

// 使用eventEmitter去追蹤進度 
function Step() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userid = searchParams.get('id');
  const projectname = searchParams.get('project');
  return (
    <div className="app">
      
        <div className='main-title-grid'>
          
          <div className='main-InstAI-icon'>
            <img src={InstAI_icon} className='logo' alt="Your Logo" />
          </div>

          <div className='main-allProject'>
              <div className="allProjects">
                <div style={{ fontWeight: "bold" }}>All Projects</div>
              </div>
          </div>

        </div>
        <div className="main-grid-line"></div>
      
        <h1 className='main-projectTitle'>
        Traffic cone 
      </h1>
      
      <nav className="secondNav">
        <ul>
          <li>Steps</li>
          <li>1.Upload & confirm  data</li>
          <li>2.Provide and confirm your model training requirements</li>
          <li>3.Train your AI model</li>
          <li>4.Download AI model</li>
          <NavLink to="/TXTtoIMG"><li>5.文生圖</li></NavLink>
          <NavLink to="/IMGtoIMG"><li>6.圖生圖</li></NavLink>
        </ul>
      </nav>

      <div className='background'></div>

        <div className="stepRectangle"></div>
      
      
      <div className="circles">
        <div className="circleNo1"></div>
        <div className="circleNo2"></div>
        <div className="circleNo3"></div>
        <div className="circleNo4"></div>
      </div>
      {/*http://localhost:3000/ReviewImg?id=1&projectname=123 */}
      {/*http://localhost:3000/ReviewImg?id=1&projectname=123 */}

      <div className="frame1">
        <ul>
          <li className='listTitle'>Upload training data</li>
          <li>Upload the image data you wish to use to train your style model</li> {/*第一個要追蹤的進度 如果使用者點進這個navlink之後 並且這個navlink被上傳的資料不為空 則顯示進度1完成 */}
        </ul>
        <NavLink to={`/Download2?id=${userid}&projectname=${projectname}`}><button className="upload-buttonNo1">Upload</button></NavLink>
      </div>

      <div className="frameNo2 ">
        <ul>
          <li className='listTitle'>Provide your training requirements</li> {/*第二個要追蹤的進度 如果使用者點進這個navlink之後 並且這個navlink上傳的資料不為空 則顯示進度2完成 */}
          <li>Tell us your specific needs for AI model training</li>
        </ul>
        <NavLink to={`/Requirment?id=${userid}&projectname=${projectname}`}><button className="upload-buttonNo2" >Fill out the form</button></NavLink>
      </div>

      <div className="frameNo3">
      <ul>
          <li className='listTitle'>Training your AI model</li>
          <li>You haven't submitted data yet</li>
        </ul>
        <NavLink to={`/ReviewImg?id=${userid}&projectname=${projectname}`}><button className="upload-buttonNo3">Check your data</button></NavLink>
        <NavLink to={`/ReviewReq?id=${userid}&projectname=${projectname}`}><button className="upload-buttonNo4">Check your requirment</button></NavLink>
      </div>

      <div className="frameNo4">
      <ul>
          <li className='listTitle'>Download AI model</li>
          <li>No model available for download</li>
        </ul>
      </div>
 
    </div>
  );
}

export default Step;