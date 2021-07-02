import react from "react";
const CoverPhotoCard = (photo) => {
  return (
    <div className="placeDetailsContainer">
      <div className="mainImg">
        <img src={`${photo}`} alt="coverphoto" />
      </div>
    </div>
  );
};
export default CoverPhotoCard;
