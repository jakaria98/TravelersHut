import React from "react";
import { Link } from "react-router-dom";
import { picUrl } from "../picUrl";
const PlaceCard = ({ name, coverPhoto, placeRating, _id, pathLink }) => (
  <article className="place">
    <div className="img-container">
      <img src={picUrl(coverPhoto)} alt={name} />
      <div className="rating-top">
        <h6>rating {placeRating ? placeRating : 0} </h6>
      </div>
      <Link
        to={{
          pathname: `${pathLink}/${name}`,
          state: {
            keyVal: _id,
          },
        }}
        className="btn btn-primary place-link"
      >
        visit
      </Link>
    </div>
    <p className="place-info">{name}</p>
  </article>
);
export default PlaceCard;
