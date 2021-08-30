import { picUrl } from "../Photo/picUrl";
const UserInfo = ({
  profile,
  profilePhoto,
  name,
  email,
  mobileNumber,
  contribution,
}) => {
  return (
    <div style={{ marginTop: "120px" }}>
      <div className="div text-center">
        <h1 className="display-4" style={{ margin: "5px" }}>
          {profile}
        </h1>
        <div />
      </div>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center tex-center">
                    <img
                      src={picUrl(profilePhoto)}
                      alt={name}
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{name}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{name}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{email}</div>
                  </div>

                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Mobile</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{mobileNumber}</div>
                  </div>
                  {contribution ? <hr /> : ""}
                  {contribution ? (
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Contribution</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">{contribution}</div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
