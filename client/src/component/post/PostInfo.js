import CoverPhotoCard from "../CoverPhotoCard";
import PhotoCard from "../PhotoCard";
const PostInfo = ({ post }) => {
  return post.length <= 0 ? (
    <h1>Loading</h1>
  ) : (
    <div className="placeDetailsContainer">
      <CoverPhotoCard photo={post.coverPhoto} />
      <div className="images">
        {post.detailsPhoto ? (
          post.detailsPhoto.map((photo, i) => (
            <PhotoCard photo={photo} key={i} />
          ))
        ) : (
          <h1>Loading</h1>
        )}
      </div>
      <div className="info">
        <h1 className="placeName">Post Details</h1>
        <div className="basic-info  post-basic-info-reposition">
          <h2>Minimum Cost: {post.minimumCost}</h2>
          <h4>Residence Facilities: {post.residence ? "Yes" : "No"}</h4>
        </div>
        <div className="basic-info m-lg-5">
          <h2>Details:</h2>
          <p>{post.details}</p>
        </div>
      </div>
    </div>
  );
};
export default PostInfo;
