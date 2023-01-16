import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

const NavBar = () => {
  const clientId = '145296169886-k6962tbt0it59d0ulg09cni5odf9jejm.apps.googleusercontent.com'
  type googleUser = {
    email: string,
    familyName: string,
    givenName: string,
    googleId: string,
    imageUrl: string,
    name: string
  }
  const [profile, setProfile] = useState<googleUser>();
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = (res: any) => {
    console.log(res.profileObj)
    setProfile(res.profileObj);
  };
  const onFailure = (err: any) => {
    console.log('failed:', err);
  };
  const logOut = () => {
    setProfile(undefined);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button>PokeAPI</button>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02" >
            <ul className="navbar-nav me-auto">

              <li className="nav-item">
                {profile ? (
                  <div >
                    <li className="nav-item">

                      <p>Name: {profile.name}</p>
                    </li>
                    <li className="nav-item">

                      <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
                    </li>
                  </div>
                ) : (
                  <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                  />
                )}

              </li>

            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;