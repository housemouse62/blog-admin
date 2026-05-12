import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { userState, tokenState, setUserState, setTokenState } = useAuth();
  const [currentPasswordState, setCurrentPasswordState] = useState("");
  const [newPasswordState, setNewPasswordState] = useState("");
  const [confirmNewPasswordState, setConfirmNewPasswordState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [confirmEmailState, setConfirmEmailState] = useState("");
  const [nameState, setNameState] = useState("");
  const [screennameState, setScreennameState] = useState("");
  const [editingState, setEditingState] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const fetchUpdate = async () => {
      const url = "http://localhost:3000/users/profile";

      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${tokenState}`,
          },
          body: JSON.stringify({
            name: nameState,
            screenname: screennameState,
            email: emailState,
            confirmEmail: confirmEmailState,
            currentPassword: currentPasswordState,
            newPassword: newPasswordState,
            confirmNewPassword: confirmNewPasswordState,
          }),
        });
        const nextresponse = await response.json();
        console.log("next response", nextresponse);
        if (nextresponse.user) {
          alert("User Updated");
          setUserState(nextresponse.user);
          setTokenState(nextresponse.token);
          localStorage.setItem("token", nextresponse.token);
          navigate("/profile");
        } else alert("Error");
      } catch (error) {
        console.error(error);
      }
    };
    fetchUpdate();
  }
  return (
    <>
      <h1>Welcome {userState.name}</h1>
      <h2>Profile Info:</h2>
      <div className="profile-page">
        <div className="profile-info">
          <div className="info-div">
            <p>
              <b>Name:</b> {userState.name}
            </p>
            <Link
              className="update-link"
              onClick={() => {
                setEditingState("name");
              }}
            >
              Edit
            </Link>
          </div>
          <div className="info-div">
            <p>
              <b>Email:</b> {userState.email}
            </p>
            <Link
              className="update-link"
              onClick={() => {
                setEditingState("email");
              }}
            >
              Edit
            </Link>
          </div>
          <div className="info-div">
            <p>
              <b>Role:</b> {userState.usertype}
            </p>
          </div>
          <div className="info-div">
            <p>
              <b>Screenname:</b> {userState.screenname}
            </p>
            <Link
              className="update-link"
              onClick={() => {
                setEditingState("screenname");
              }}
            >
              Edit
            </Link>
          </div>
          <div className="info-div">
            <Link
              className="update-link"
              onClick={() => {
                setEditingState("password");
              }}
            >
              Change Password
            </Link>
          </div>
        </div>
        <div className="change-information">
          {editingState ? (
            <form className="update-form" onSubmit={handleSubmit}>
              <legend>Update Personal Info:</legend>
              <div className="form-fields">
                {editingState === "screenname" ? (
                  <div className="form-field">
                    <label className="form-label">
                      <input
                        type="text"
                        name="screenname"
                        id="screenname"
                        className="form-input"
                        placeholder=" "
                        value={screennameState}
                        onChange={(e) => setScreennameState(e.target.value)}
                        autoComplete="name"
                      />
                      <span>Screen Name</span>
                    </label>
                  </div>
                ) : (
                  ""
                )}
                {editingState === "name" ? (
                  <div className="form-field">
                    <label className="form-label">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-input"
                        placeholder=" "
                        value={nameState}
                        onChange={(e) => setNameState(e.target.value)}
                        autoComplete="name"
                      />
                      <span>Name</span>
                    </label>
                  </div>
                ) : (
                  ""
                )}
                {editingState === "email" ? (
                  <>
                    <div className="form-field">
                      <label className="form-label">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-input"
                          placeholder=" "
                          value={emailState}
                          onChange={(e) => setEmailState(e.target.value)}
                          autoComplete="email"
                        />
                        <span>Email</span>
                      </label>
                    </div>
                    <div className="form-field">
                      <label className="form-label">
                        <input
                          type="email"
                          name="confirmEmail"
                          id="confirmEmail"
                          className="form-input"
                          placeholder=" "
                          value={confirmEmailState}
                          onChange={(e) => setConfirmEmailState(e.target.value)}
                          autoComplete="email"
                        />
                        <span>Confirm Email</span>
                      </label>
                    </div>{" "}
                  </>
                ) : (
                  ""
                )}
                {editingState === "password" ? (
                  <>
                    <div className="form-field">
                      <label className="form-label">
                        <input
                          type="password"
                          name="currentPassword"
                          id="currentPassword"
                          className="form-input"
                          placeholder=" "
                          value={currentPasswordState}
                          onChange={(e) =>
                            setCurrentPasswordState(e.target.value)
                          }
                          autoComplete="current-password"
                        />
                        <span>Current Password</span>
                      </label>
                    </div>
                    <div className="form-field">
                      <label className="form-label">
                        <input
                          type="password"
                          name="newPassword"
                          id="newPassword"
                          className="form-input"
                          placeholder=" "
                          value={newPasswordState}
                          onChange={(e) => setNewPasswordState(e.target.value)}
                          autoComplete="current-password"
                        />
                        <span>New Password</span>
                      </label>
                    </div>
                    <div className="form-field">
                      <label className="form-label">
                        <input
                          type="password"
                          name="confirmNewPassword"
                          id="confirmNewPassword"
                          className="form-input"
                          placeholder=" "
                          value={confirmNewPasswordState}
                          onChange={(e) =>
                            setConfirmNewPasswordState(e.target.value)
                          }
                          autoComplete="current-password"
                        />
                        <span>Confirm New Password</span>
                      </label>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
              {editingState ? (
                <button type="submit" className="form-button">
                  Update Information
                </button>
              ) : (
                ""
              )}
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
