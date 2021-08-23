import react from "react";
import { picUrl } from "./picUrl";
const PhotoCard = ({ photo }) => {
  return (
    <div className="placeDetails">
      <div className="placeDetailsImg-container">
        <img src={picUrl(photo)} alt={photo} />
      </div>
    </div>
  );
};
export default PhotoCard;
