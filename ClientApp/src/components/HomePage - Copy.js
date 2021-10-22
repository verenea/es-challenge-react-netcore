import React, { Component } from 'react';
import { endsWith } from 'lodash';
import {
  InputGroup,
  InputGroupAddon,
  Input,
  Button,
  Form, FormGroup,
  FormFeedback,
  Alert
} from 'reactstrap';
import SearchResults from './SearchResults';
import { isValidVersion } from '../utils';

export default class HomePage extends Component {
  static displayName = HomePage.name;

  constructor(props) {
    super(props);
    this.state = {
      softwares: [],
      loading: false,
      searchText: props.version || '',
      lastSearch: null,
      invalidEntry: false,
      error: null,
    };
  }

  componentDidMount() {
    const { searchText } = this.state;
    if (searchText) {
      this.handleSearch(searchText);
    }
  }

  // update state for current search box value
  // and run validation for immediate feedback
  setSearchText(value) {
    const { searchText } = this.state;
    if (value !== searchText) {
      this.setState({ searchText: value }, () => value && this.validateTextEntry(value));
    }
  }

  // this method will check
  validateTextEntry(text) {
    const { invalidEntry } = this.state;
    const invalid = isValidVersion(text) === false;
    if (invalidEntry !== invalid) {
      this.setState({ invalidEntry: invalid })
    }
  }

  // support enter-button auto submit
  onSearchBoxKeyDown = evt => {
    if (evt.key === 'Enter') {
      this.handleSearch();
      evt.preventDefault();
      return false;
    }
  }

  // proxy method to make sure we submit valid values from client
  // then handle the promisified async call to the data
  handleSearch = () => {
    const { searchText } = this.state;
    // validate the input version to see if we need to display warning
    if (isValidVersion(searchText) && !endsWith(searchText, '.')) {
      // if valid, update state
      this.setState({ loading: true, invalid: false, error: null });
      // then exec async fetch...
      fetchSoftwareVersions(searchText)
        .then(data => this.setState({ softwares: data || [], loading: false, lastSearch: searchText }))
        .catch(err => this.setState({ error: err.message, loading: false }));
    } else {
      // invalid input, show warning
      this.setState({ invalidEntry: true });
    }
  }

  render() {
    const { searchText, loading, softwares, lastSearch, invalidEntry, error } = this.state;
    return (
      <div>
        <h1 id="tabelLabel" >Software Version Search</h1>
        <Form style={{ minHeight: 80 }}>
          <FormGroup>
            <InputGroup>
              <Input
                placeholder="Enter a version number..."
                type="search"
                value={searchText}
                onChange={e => this.setSearchText(e.target.value)}
                onKeyDown={this.onSearchBoxKeyDown}
                invalid={invalidEntry}
              />
              <InputGroupAddon addonType="append">
                <Button
                  color="secondary"
                  onClick={() => this.handleSearch()}
                  disabled={loading || invalidEntry || !searchText}
                >
                  Search
                </Button>
              </InputGroupAddon>
              {invalidEntry && <FormFeedback invalid="true">You must enter a valid version number, such as "2", "1.5", or in SEMVER format: "2.12.4"</FormFeedback>}
            </InputGroup>
          </FormGroup>
        </Form>
        {error ? (
          <Alert color="danger">{error}</Alert>
        ) : (
          <SearchResults hits={softwares} loading={loading} term={lastSearch} />
        )}
      </div>
    );
  }
}

async function fetchSoftwareVersions(version) {
  const params = { ver: version || '' };
  // fetch request for data
  const response = await fetch(`search?${new URLSearchParams(params)}`);
  // read response
  const data = await response.json();
  // check for errors
  if (!response.ok) {
    console.warn('fetchData meh', { response, data });
    throw new Error(data.message || response.status);
  } else {
    return data;
  }
}