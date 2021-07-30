import React from "react";
import { Link } from "react-router-dom";
const PlaceCard = ({ name, coverPhoto, placeRating, _id }) => (
  <article className="place">
    <div className="img-container">
      <img src={coverPhoto} alt={name} />
      <div className="rating-top">
        <h6>rating {placeRating ? placeRating : 0} </h6>
      </div>
      <Link
        to={{
          pathname: `/places/${name}`,
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
