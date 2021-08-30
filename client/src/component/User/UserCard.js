import React from "react";
import { Link } from "react-router-dom";
import { picUrl } from "../Photo/picUrl";
const UserCard = ({ profilePhoto, _id, name, linkPath }) => {
  return (
    <article className="place">
      <div className="img-container">
        <img src={picUrl(profilePhoto)} alt="" />
        <Link
          to={{
            pathname: `${linkPath}/${name}`,
            state: { userID: _id },
          }}
          className="btn btn-primary place-link"
        >
          See
        </Link>
      </div>
      <p className="place-info">{name}</p>
    </article>
  );
};
export default UserCard;
