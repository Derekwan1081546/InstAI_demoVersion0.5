import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

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
  
  return (
    <div>
      <h2>Image Preview</h2>
      {imagePreviews.map((preview, index) => (
        <div key={index}>
          <img
            //src={preview}
            src={`http://localhost:8080${preview}`}
            alt={`image ${index}`}
            style={{ width: '128px', height: '128px' }}
            loading='lazy'
          />
        </div>
      ))}
    </div>
  );
}

export default ReviewImg;
