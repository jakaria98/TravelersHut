import CoverPhotoCard from "../CoverPhotoCard";
import PhotoCard from "../PhotoCard";
import Loading from "../Loading";
const PlaceInfo = ({
  coverPhoto,
  name,
  division,
  district,
  upazila,
  createdAt,
  detailsPhoto,
  report,
}) => (
  <div className="placeDetailsContainer mt-5">
    <CoverPhotoCard photo={coverPhoto} />
    <div className="info bg-white">
      <h1 className="placeName">{name}</h1>
      <div className=" container d-flex justify-content-center ">
        <div className="basic-info mx-5">
          <h2>Details</h2>
          <h4>Division: {division}</h4>
          <h4>District: {district}</h4>
          <h4>Upazila: {upazila}</h4>
          <h5>Created at: {createdAt}</h5>
        </div>
        {report ? (
          <div className="basic-info ">
            <h2>Reported Issue</h2>
            <p>{report}</p>
          </div>
        ) : null}
      </div>
    </div>

    <div className="images">
      {detailsPhoto ? (
        detailsPhoto.map((photo, index) => (
          <PhotoCard photo={photo} key={index} />
        ))
      ) : (
        <Loading />
      )}
    </div>
  </div>
);

export default PlaceInfo;
