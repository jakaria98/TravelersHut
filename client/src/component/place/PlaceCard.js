import React from "react";
import { Link } from "react-router-dom";
const PlaceCard = ({ place }) => (
  <article className="place">
    <div className="img-container">
      <img src={place.coverPhoto} alt={place.name} />
      <div className="rating-top">
        <h6>rating {place.ratedBy} </h6>
      </div>
      <Link
        to={{
          pathname: `/places/${place.name}`,
          state: {
            keyVal: place._id,
          },
        }}
        className="btn btn-primary place-link"
      >
        visit
      </Link>
    </div>
    <p className="place-info">{place.name}</p>
  </article>
);
export default PlaceCard;
