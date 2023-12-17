import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';

function ReviewImg() {
  //const { id, projectname } = useParams();
  const [imagePreviews, setImagePreviews] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const projectname = searchParams.get("projectname");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/upload/download?username=${id}&projectname=${projectname}`);
        setImagePreviews(response.data.images);
      } catch (error) {
        console.error('Error fetching image previews:', error);
      }
    };
  
    fetchData();
  }, [id, projectname]);
  
  const handleDeleteImage = async (index) => {
    const confirmDelete = window.confirm("確定要刪除圖片?");
    if (!confirmDelete) {
      return;
    }

    const updatedPreviews = [...imagePreviews];
    const deletedImage = updatedPreviews.splice(index, 1)[0]; // 取得被刪除的圖片
    setImagePreviews(updatedPreviews); // 更新 imagePreviews

    try {
      const response = await axios.post(`http://localhost:8080/api/upload/deleteimg?username=${id}&projectname=${projectname}`, { filename: deletedImage })
      .then(response => {
        console.log(response.data);
        // Handle success
        alert('delete success');
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });

      console.log(response);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };


  return (
    <div>
      <h2>Image Preview</h2>
      <NavLink to={`/Step?id=${id}&project=${projectname}`}>
            <button >Go Back</button>
      </NavLink>
      {imagePreviews.map((preview, index) => (
        <div key={index}>
          <img
            //src={preview}
            src={`http://localhost:8080${preview}`}
            alt={`image ${index}`}
            style={{ width: '128px', height: '128px' }}
            loading='lazy'
          />
          <button  onClick={() => handleDeleteImage(index)}>刪除</button>
        </div>
      ))}
    </div>
  );
}

export default ReviewImg;
