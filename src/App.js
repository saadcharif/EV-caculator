import React, { Component } from 'react';
import './App.css';
import NewEntryForm from './components/new-entry-form/newEntryForm';
import Container from './components/container/container';

// Defining pages used in the app, for now we have only one but this is the method to add different pages if more are required
const pages = {
  newEntry: {
    text: 'New Entry',
    icon: 'new',
  },
  
 
}

export default class App extends Component {
  componentWillMount() {
    // Backfill existing entries with the new default Unit, we can create a new page for example "previous calculations" 
    //and all our data would be saved within it
    //all the functions below can be used to retrieve existing calculations which could have been saved
    const entries = this.retriveEntries();
    const Units = this.retriveUnits();
    const Unit = Units[0];
   
    this.setState({
      entries,
      units: this.getUnits(),
      currentPage: this.getCurrentPageOrDefault(),
      Units,
      Unit,
    });
  }

  componentWillUpdate(_, nextState) {
    this.syncDatabase(nextState.entries, nextState.Units);
  }

  syncDatabase = (newEntries, newUnits) => {
    localStorage.setItem('entries', JSON.stringify(newEntries));
    localStorage.setItem('Units', JSON.stringify(newUnits));
  }

  retriveEntries = () => {
    return JSON.parse(localStorage.getItem('entries')) || [];
  }

  retriveUnits = () => {
    const Units = JSON.parse(localStorage.getItem('Units')) || [{name: 'Default',  id: 1}];
    this.setUnit(Units[0]);
    return Units;
  }

  getUnits = () => {
    return localStorage.getItem('units') || "Car/ Light Van";
  }

  setUnits = (newUnits) => {
    localStorage.setItem('units', newUnits);
    this.setState({units: newUnits});
  }

  setUnit = (Unit) => {
    this.setState({Unit});
   
  }

 // the following pushes our calculation to be submitted and can be saved within a different component if required
  addEntry = (entry) => {
    const entries = [...this.state.entries];
    entries.push(entry);
    this.setState({entries});
  }

  getCurrentPageOrDefault = () => {
    const urlPage = window.location.pathname.replace('/', '');

    if (pages[urlPage] !== undefined) {
      return urlPage;
    }

    return Object.keys(pages)[0];
  }

  renderContent = (page) => {
    let entriesForUnit = this.state.entries.filter((entry) =>
      entry.UnitId === this.state.Unit.id);

    switch (page) {
      case 'newEntry':
        return (
          <NewEntryForm
            addEntry={this.addEntry}
            setUnits={this.setUnits}
            currentUnits={this.state.units}
            entries={entriesForUnit}
            currentUnit={this.state.Unit}
          />
        );
        
      default:
        return <div>That page does not exist</div>;
    }
  }

  render() {
    return (
      <div className="App">
        <Container>
         
          {this.renderContent(this.state.currentPage)}
        </Container>
      </div>
    );
  }
}
