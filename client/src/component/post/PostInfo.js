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
      <div className="info bg-white">
        <h1 className="placeName">Full Review</h1>
        <div className="container d-flex justify-content-center">
          <div className="basic-info mx-5">
            <h2>Minimum Cost: {post.minimumCost}</h2>
            <h4>Residence Facilities: {post.residence ? "Yes" : "No"}</h4>
          </div>
          <div className="basic-info">
            <h2>Details:</h2>
            <p>{post.details}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostInfo;
