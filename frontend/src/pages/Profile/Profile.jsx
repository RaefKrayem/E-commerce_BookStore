import "../Login2/Login2.scss";
import { updateProfile } from "../../features/auth/authSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { name, email } = formData;
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { name, email };
    dispatch(updateProfile(userData));
    toast.success("Profile Updated Successfully");
    navigate("/store");
  };

  return (
    <div>
      <link
        href="http://fonts.googleapis.com/css?family=Montserrat:400,700"
        rel="stylesheet"
        type="text/css"
      />
      <div className="logo"></div>
      <div className="login-block">
        <h1>Edit Profile</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
