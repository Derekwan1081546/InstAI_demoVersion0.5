import { useLocation, useParams, useNavigate } from 'react-router-dom';

function ReviewImg() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, projectname } = useParams();
  const imagePreviews = location.state?.imagePreviews || [];

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
