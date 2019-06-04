import React from "react";
import PropTypes from "prop-types";

class BuildList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { builds } = this.props;

    if (builds.length === 0) {
      return (
        <div className="row">
          <h4>No builds</h4>
          <p>There are currently no builds of this snap.</p>
        </div>
      );
    }

    builds = builds.map(build => {
      const revisionId = build.revision_id
        ? build.revision_id.slice(-9, -1)
        : "";
      const buildStateClass = build.buildstate.startsWith("Successfully")
        ? "success"
        : "error";

      return (
        <tr key={build.self_link}>
          <td className="p-snap-build-state">
            <i className={"p-icon--" + buildStateClass} />
            <span className={"p-snap-build-" + buildStateClass}>
              {build.buildstate}
            </span>
          </td>
          <td>
            <a href={build.web_link}>#{build.web_link.split("/").pop()}</a>
          </td>
          <td>
            Commit <i className="p-icon--commit" /> {revisionId}
          </td>
          <td>{build.arch_tag}</td>
          <td>
            <p>
              <i className="p-icon--timer" /> {build.duration.slice(0, 7)}
            </p>
            <p>
              <i className="p-icon--calendar" /> {build.datebuilt.slice(0, 10)}
            </p>
          </td>
        </tr>
      );
    });

    return (
      <div className="row">
        <h4>Latest {builds.length} Builds</h4>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Number</th>
              <th>Trigger</th>
              <th>Architecture</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>{builds}</tbody>
        </table>
      </div>
    );
  }
}

BuildList.propTypes = {
  builds: PropTypes.array
};

export { BuildList as default };
