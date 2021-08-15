import { VscReport } from "react-icons/vsc";
import CoverPhotoCard from "../CoverPhotoCard";
import PhotoCard from "../PhotoCard";
const PostInfo = ({
  coverPhoto,
  detailsPhoto,
  residence,
  details,
  minimumCost,
  report,
}) => {
  return (
    <div className="placeDetailsContainer">
      <CoverPhotoCard photo={coverPhoto} />
      <div className="images">
        {detailsPhoto ? (
          detailsPhoto.map((photo, i) => <PhotoCard photo={photo} key={i} />)
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      {report ? null : (
        <button
          className="btn btn-warning mt-3 mb-4 d-block container"
          style={{ width: "50%" }}
        >
          <VscReport size={20} /> Report
        </button>
      )}
      <div className="info bg-white">
        <h1 className="placeName">Full Review</h1>
        <div className="container d-flex justify-content-center">
          <div className="basic-info mx-5">
            <h2>Minimum Cost: {minimumCost}</h2>
            <h4>Residence Facilities: {residence ? "Yes" : "No"}</h4>
          </div>
          <div className="basic-info">
            <h2>Details:</h2>
            <p>{details}</p>
          </div>
          {report ? (
            <div className="basic-info">
              <h2>Reported Issue</h2>
              <p>{report}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default PostInfo;
