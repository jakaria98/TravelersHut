import React from "react";
import { Link } from "react-router-dom";
const PostCard = ({ post }) => (
  <article className="place">
    <div className="img-container">
      <img src={`${post.coverPhoto}`} alt={`${post.name}`} />
      <div className="rating-top">
        <h6> Rating {post.ratedBy}</h6>
      </div>
      <Link
        to={{
          pathname: `/blog/${post._id}`,
          state: {
            postId: post._id,
          },
        }}
        className="btn btn-primary place-link"
      >
        details
      </Link>
    </div>
    <p className="place-info">{post.createdAt}</p>
  </article>
);
export default PostCard;
