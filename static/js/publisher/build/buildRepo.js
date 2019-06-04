import React from "react";
import PropTypes from "prop-types";

class BuildRepo extends React.Component {
  constructor(props) {
    super(props);
  }

  searchInputChange(e) {
    this.props.search(e.target.value);
  }

  render() {
    const { repos } = this.props;

    const repoList = repos ? (
      repos.map(repo => (
        <div
          key={repo.id}
          className="row p-build-repo"
          onClick={() => this.props.enable(repo.html_url)}
        >
          <div className="col-11">
            <img
              className="p-build-repo-owner-avatar"
              src={repo.owner.avatar_url}
            />
            <span className="p-build-repo-owner-name">
              {" "}
              {repo.owner.login}/
            </span>
            <span className="p-build-repo-name"> {repo.name}</span>
          </div>
          <div className="col-1 u-align-text--right">
            <i className="p-icon--plus p-build-repo-connect" />
          </div>
        </div>
      ))
    ) : (
      <div className="row">
        <div className="col-12">Could not find any repositories</div>
      </div>
    );

    return (
      <React.Fragment>
        <div className="row u-vertically-center">
          <div className="col-8">
            <h2 className="p-heading--four">Build snap from</h2>
          </div>
          <div className="col-4">
            <form className="p-search-box">
              <input
                type="search"
                className="p-search-box__input"
                placeholder="Search your repositories..."
                onChange={e => {
                  this.searchInputChange(e);
                }}
              />
            </form>
          </div>
        </div>
        <div className="p-build-repos">{repoList}</div>
      </React.Fragment>
    );
  }
}

BuildRepo.propTypes = {
  repos: PropTypes.array,
  enable: PropTypes.func,
  search: PropTypes.func
};

export { BuildRepo as default };
