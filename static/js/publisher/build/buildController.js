import React from "react";
import PropTypes from "prop-types";

import BuildList from "./buildList";
import BuildRepo from "./buildRepo";

class BuildController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      builds: [],
      repos: []
    };
  }

  componentDidMount() {
    this.searchBuilds(this.props.snap);
  }

  enableBuilds(repo) {
    const { snap } = this.props;
    const url = `/${snap.name}/builds/enable?build_repo=${repo}`;
    fetch(url).then(res => {
      if (res.status == 200) {
        this.setState({
          enabled: true
        });
      }
    });
  }

  searchBuilds() {
    const { snap } = this.props;
    const url = `/${snap.name}/builds/list`;
    fetch(url)
      .then(res => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then(builds => {
        if (builds) {
          this.setState({
            builds
          });
        }
      });
  }

  searchRepos(search) {
    const { snap } = this.props;
    const url = search
      ? `/${snap.name}/builds/repositories?search=${search}`
      : `/${snap.name}/builds/repositories`;

    fetch(url)
      .then(res => res.json())
      .then(result =>
        this.setState({
          repos: result.items
        })
      );
  }

  render() {
    const { builds, repos } = this.state;

    if (!builds) {
      return (
        <BuildRepo
          repos={repos}
          enable={repo => this.enableBuilds(repo)}
          search={search => this.searchRepos(search)}
        />
      );
    }
    return <BuildList builds={builds} />;
  }
}

BuildController.propTypes = {
  snap: PropTypes.object
};

export { BuildController as default };
