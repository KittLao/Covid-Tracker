import React from 'react';

import { Cards, CountrySelector, Chart } from './components';
import { fetchData } from './api/';
import styles from './App.module.css';

import logo from './images/logo.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  // Only want to fetch data from the api once
  async componentDidMount() {
    const data = await fetchData();
    this.setState({ data });
  }

  // Fetch data from api, but this time specify
  // the country. This would prevent fetching
  // the entire dataset.
  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({ data, country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={logo} alt="COVID-19" />
        <Cards data={data} />
        <CountrySelector handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> 
      </div>
    );
  }
}

export default App;
