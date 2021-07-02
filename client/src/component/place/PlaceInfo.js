import react from "react";
import CoverPhotoCard from "../CoverPhotoCard";
import PhotoCard from "../PhotoCard";
const PlaceInfo = ({ place }) => {
  return place.length <= 0 ? (
    <h1>Loading</h1>
  ) : (
    <div className="placeDetailsContainer">
      <CoverPhotoCard photo={place.coverPhoto} />
      <div className="info ">
        <h1 className="placeName">{place.name}</h1>
        <div className="basic-info basic-info-reposition">
          <h2>Details</h2>
          <h4>Division: {place.division}</h4>
          <h4>District: {place.district}</h4>
          <h4>Upazila: {place.upazila}</h4>
          <h5>Created at: {place.createdAt}</h5>
        </div>
      </div>
      <div className="images">
        {place.detailsPhoto ? (
          place.detailsPhoto.map((photo, index) => (
            <PhotoCard photo={photo} key={index} />
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </div>
  );
};
export default PlaceInfo;
