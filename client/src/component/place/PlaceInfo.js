import react from "react";
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
}) => (
  <div className="placeDetailsContainer">
    <CoverPhotoCard photo={coverPhoto} />
    <div className="info ">
      <h1 className="placeName">{name}</h1>
      <div className="basic-info basic-info-reposition">
        <h2>Details</h2>
        <h4>Division: {division}</h4>
        <h4>District: {district}</h4>
        <h4>Upazila: {upazila}</h4>
        <h5>Created at: {createdAt}</h5>
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

export default PlaceInfo;
