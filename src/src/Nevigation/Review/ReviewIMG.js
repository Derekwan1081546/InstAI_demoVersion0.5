import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReviewImg() {
  const { id, projectname } = useParams();
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/upload/upload?username=${id}&projectname=${projectname}`);
        setImagePreviews(response.data);
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
            src={preview}
            alt={`image ${index}`}
            style={{ width: '100px', height: '120px' }}
            loading='lazy'
          />
        </div>
      ))}
    </div>
  );
}

export default ReviewImg;
