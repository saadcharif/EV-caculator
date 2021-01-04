import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './newEntryForm.css';
import { labelNames, convertDistance } from '../../utilities';
import LastEntry from './lastEntry/lastEntry';


export default class NewEntryForm extends Component {
  constructor() {
    super();

    this.createEntry = this.createEntry.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.clearForm = this.clearForm.bind(this);
    
  }
  
    state = {
    errors: [],
    submitError: false
  }

  createEntry(event) {
    event.preventDefault();
    let currentErrors = [];
    const currentUnits = this.props.currentUnits;
    const entry = {
      
      miles: convertDistance(parseFloat(this.miles.value), currentUnits, true),
      UnitId: this.props.currentUnit.id,
    }

    Object.keys(entry).forEach((key) => {
      if (this.isEmpty(entry[key])) {
        currentErrors.push(key);
      }
    });

    if (currentErrors.length === 0) {
      this.props.addEntry(entry);
      this.clearForm();
    } else {
      this.setState({
        errors: currentErrors,
        submitError: true
        
      }
      );
    }
  }

  isEmpty(value) {
    return typeof value === "string" && value.trim() === "";
  }

  handleBlur(event) {
    const value = event.target.value;
    const id = event.target.id;
    const isEmpty = this.isEmpty(value);
    if (!isEmpty && this.state.errors.indexOf(id) > -1) {
      const errors = [...this.state.errors];
      errors.splice(errors.indexOf(id), 1);
      this.setState({errors});
    } else if (isEmpty) {
      const errors = [...this.state.errors];
      errors.push(id);
      this.setState({errors});
    }
  }

  clearForm() {
    this.form.reset();
    this.setState({
      errors: [],
      submitError: false
    })
  }

  render() {
 

    const currentUnits = this.props.currentUnits;
    const switchUnitsButton = () => {
      return (
     

        <div className="column padding">
          <div className="title">EV Calculator</div>
         
          <div className="text">I drive a</div>
          
            <select id={currentUnits} onChange={(event) => this.props.setUnits(event.target.value)} className="select-styling">
              <option value="Car/Light Van">Car/ Light Van</option>
              <option value="Medium Van">Medium Van</option>
              <option value="Large Van">Large Van</option>
            </select>
        </div>
      )
    }
    const labels = labelNames(currentUnits);
    return (
    
      <div className="main-container" ng-class="{ 'has-error' : NewEntryForm.name.$invalid && (NewEntryForm.$submitted  || NewEntryForm.name.$touched ) }">
        <form ref={(form) => this.form = form} className="NewEntryForm shadow" onSubmit={(event) => this.createEntry(event)}>
     
           {switchUnitsButton()}
           
           <div className="column padding">
            <div>
             <div className="text">and travel</div>
            </div>
              <input
                className="input-styling"
                id="miles"
                placeholder={`${labels.distance.toLowerCase()}`}
                type="number"
                step="any"
                min="0"
                onBlur={(event) => this.handleBlur(event)}
                ref={(input) => this.miles = input}
                ng-hide="NewEntryForm.name.$invalid && (NewEntryForm.$submitted  || NewEntryForm.name.$touched )"
                ng-class="" ng-model="mile" required
              />
              <label ng-show="NewEntryForm.name.$invalid && (NewEntryForm.$submitted  || NewEntryForm.name.$touched )"></label>
              <div className="text">miles per week</div>
               

            <div className="row">   
      
            <button className="destructive" type="button" onClick={this.clearForm}>Clear Form</button>
            <button type="submit" className="submit">Submit</button>
              </div> 

              </div>    

    
        </form>
        <LastEntry entries={this.props.entries} currentUnits={this.props.currentUnits} />
         
      
        </div>
    )
  }
  
  
  static propTypes = {
    addEntry: PropTypes.func.isRequired,
    setUnits: PropTypes.func.isRequired,
    currentUnits: PropTypes.string.isRequired,
    entries: PropTypes.array.isRequired,
    currentUnit: PropTypes.object.isRequired
  }
}
