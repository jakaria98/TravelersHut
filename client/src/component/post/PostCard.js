import React from "react";
import star from "../images/star.png";
import { Link } from "react-router-dom";
const post = (post) => {
  return (
    <article className="place">
      <div className="img-container">
        <img src={`${post.coverPhoto}`} alt={`${post.name}`} />
        <div className="rating-top">
          <h6>
            {" "}
            Rating
            {post.ratingCount / post.ratedBy} <img src={star} width="40px" />
          </h6>
        </div>
        <Link
          to={{
            pathname: `/blog/${post.place}`,
            state: {
              postId: post._id,
            },
          }}
          className="btn btn-primary place-link"
        >
          details
        </Link>
      </div>
      <p className="place-info">{post.place}</p>
    </article>
  );
};

export default post;
