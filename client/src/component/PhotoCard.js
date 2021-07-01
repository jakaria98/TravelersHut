import react from "react";
const PhotoCard = (photo) => {
  return (
    <div className="placeDetails">
      <div className="placeDetailsImg-container">
        <img src={`${photo}`} alt="" />
      </div>
    </div>
  );
};
export default PhotoCard;
