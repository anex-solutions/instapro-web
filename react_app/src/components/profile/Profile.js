import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// import ProfilePosts from "./ProfilePosts";

import { getProfile } from "../../actions/ProfileActions";
import { Navbar } from "../layout/Navbar";

export class Profile extends Component {
  //if profile id == req.user / auth.upser id then show actions

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.match.params.username) {
      this.props.getProfile(this.props.match.params.username);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  addDefaultSrc(ev) {
    ev.target.src =
      "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png";
  }

  render() {
    const { profile, loading } = this.props;
    const { user } = this.props.auth;

    let content;
    if (profile === null || profile === undefined || loading) {
      content = <div>Loading</div>;
    } else {
      content = (
        <div className="row mt-5">
          <div className="col-md-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              onError={this.addDefaultSrc}
              className="img-responsive rounded-circle"
              height="150"
            />
          </div>
          <div className="col-md-8"> 
            <div className="row">
              {profile.username}{" "}
              <button type="button" className="btn btn-outline-secondary">
                Edit Profile
              </button>
              <i class="fas fa-cog fa-2x" />
            </div>
            <div className="row">posts, followers, following</div>
            <strong>name</strong>
            <div>bio</div>
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* <Navbar /> */}
        <div className="container">
          {content}
          <div className="row">nav</div>
          <div className="row">profileposts</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profiles.profile,
  auth: state.auth
});

const mapDispatchToProps = {
  getProfile
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
