import react from "react";
import CoverPhotoCard from "../CoverPhotoCard";
import PhotoCard from "../PhotoCard";
const PlaceInfo = (place) => {
  return (
    <div className="placeDetailsContainer">
      <CoverPhotoCard coverPhoto={place.coverPhoto} />
      <div className="images">
        {place.detailsPhoto.map((photo) => (
          <PhotoCard photo={photo} />
        ))}
      </div>
      <div className="info">
        <h1 className="placeName">{place.name}</h1>
        <div className="basic-info">
          <h2>Details</h2>
          <h4>Division: {place.division}</h4>
          <h4>District: {place.district}</h4>
          <h4>Upazila: {place.upazila}</h4>
          <h5>Created at: {place.createdAt}</h5>
        </div>
      </div>
    </div>
  );
};
export default PlaceInfo;
