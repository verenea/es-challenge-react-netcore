import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';

export default function SearchResults({ loading, hits, term }) {
  if (loading) {
    return <p><em>Loading...</em></p>;
  }
  if (!term) {
    return null;
  }
  return (
    <section>
      <p>{`${hits.length > 0 ? `Found ${hits.length} results` : 'No results were found'} for software with versions greater than "${term}"`}</p>
      {hits.length > 0 && (
        <ul className="hits-list">
          {hits.map(hit => (
            <li key={`${hit.name}_${hit.version}`} className="hit-item">
              <article className="hit-card">
                <h4>{hit.name}</h4>
                <p>{hit.version}</p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

SearchResults.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
  })).isRequired,
  term: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

//static renderSearchResults(hits) {
//  return (
//    <table className='table table-striped' aria-labelledby="tabelLabel">
//      <thead>
//        <tr>
//          <th>Name</th>
//          <th>Version</th>
//          <th>Release Date</th>
//          <th>Summary</th>
//        </tr>
//      </thead>
//      <tbody>
//        {hits.map(hit =>
//          <tr key={`${hit.name}_${hit.version}`}>
//            <td>{hit.name}</td>
//            <td>{hit.version}</td>
//            <td>{hit.date}</td>
//            <td>{hit.summary}</td>
//          </tr>
//        )}
//      </tbody>
//    </table>
//  );
//}