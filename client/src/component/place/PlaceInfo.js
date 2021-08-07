import react from "react";
import { connect } from "react-redux";
import CoverPhotoCard from "../CoverPhotoCard";
import PhotoCard from "../PhotoCard";
const PlaceInfo = ({
  coverPhoto,
  name,
  division,
  district,
  upazila,
  createdAt,
  detailsPhoto,
  report,
}) => (
  <div className="placeDetailsContainer">
    <CoverPhotoCard photo={coverPhoto} />
    <div className="info ">
      <h1 className="placeName">{name}</h1>
      <div
        className={
          report ? "post-basic-info-reposition" : "basic-info-reposition"
        }
      >
        <div className="basic-info ">
          <h2>Details</h2>
          <h4>Division: {division}</h4>
          <h4>District: {district}</h4>
          <h4>Upazila: {upazila}</h4>
          <h5>Created at: {createdAt}</h5>
        </div>
        {report ? (
          <div className="basic-info ">
            <h2>Reported Problem</h2>
            <p>{report}</p>
          </div>
        ) : null}
      </div>
    </div>

    <div className="images">
      {detailsPhoto ? (
        detailsPhoto.map((photo, index) => (
          <PhotoCard photo={photo} key={index} />
        ))
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return {
    admin: state.admin,
  };
};
export default connect(mapStateToProps)(PlaceInfo);
