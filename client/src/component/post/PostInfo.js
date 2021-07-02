import CoverPhotoCard from "../CoverPhotoCard";
import PhotoCard from "../PhotoCard";
const PostInfo = ({ post }) => {
  return post.length <= 0 ? (
    <h1>Loading</h1>
  ) : (
    <div className="placeDetailsContainer">
      <CoverPhotoCard photo={post.coverPhoto} />
      <div className="images">
        {post.images ? (
          post.images.map((photo, i) => <PhotoCard photo={photo} key={i} />)
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      <div className="info">
        <h1>From: {post.visitingFrom}</h1>
        <div className="basic-info">
          <h2>Details</h2>
          <p>{post.details}</p>
        </div>
        <div className="basic-info">
          <h2>Minimum Cost: {post.minimumCost}</h2>
          <h4>Residence Facilities: {post.residence ? "Yes" : "No"}</h4>
        </div>
      </div>
    </div>
  );
};
export default PostInfo;
