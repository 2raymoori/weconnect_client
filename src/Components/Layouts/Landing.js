import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";

const Landing = (props) => {
  if (props.auth.isAuthenticated) {
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Let's Connect</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers...
          </p>
          <div className="buttons">
            <Link onClick={()=>{props.showItem(1)}} to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link onClick={()=>{props.showItem(1)}} to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Landing);
