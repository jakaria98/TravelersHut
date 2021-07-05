import React from "react";
import { Link } from "react-router-dom";
const GuideCard = ({ guide }) => {
  return (
    <article className="place">
      <div className="img-container">
        <img src={guide.profilePhoto} />
        <Link
          to={{
            pathname: `/guide/${guide.name}`,
            state: { guideID: guide._id },
          }}
          className="btn btn-primary place-link"
        >
          See
        </Link>
      </div>
      <p className="place-info">{guide.name}</p>
    </article>
  );
};
export default GuideCard;
