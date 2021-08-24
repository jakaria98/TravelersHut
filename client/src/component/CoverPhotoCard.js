import react from "react";
import { picUrl } from "./picUrl";
const CoverPhotoCard = ({ photo }) => {
  console.log(photo);
  return (
    <div className="placeDetailsContainer">
      <div className="mainImg">
        <img src={picUrl(photo)} alt="cover photo" />
      </div>
    </div>
  );
};
export default CoverPhotoCard;
