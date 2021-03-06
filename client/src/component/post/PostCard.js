import React from "react";
import { Link } from "react-router-dom";
import { picUrl } from "../Photo/picUrl";
const PostCard = ({ coverPhoto, pathLink, _id, createdAt }) => (
  <article className="place">
    <div className="img-container">
      <img src={picUrl(coverPhoto)} alt="Cover Photo" />
      <Link
        to={{
          pathname: `${pathLink}/${_id}`,
          state: {
            postId: _id,
          },
        }}
        className="btn btn-primary place-link"
      >
        details
      </Link>
    </div>
    <p className="place-info">{createdAt}</p>
  </article>
);
export default PostCard;
