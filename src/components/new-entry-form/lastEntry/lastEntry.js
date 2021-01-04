import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './lastEntry.css';
import { labelNames, convertDistance, calculateCO2, calculateCost, ev, evCost} from '../../../utilities';
import AnimatedNumber from 'react-animated-number';



export default class LastEntry extends Component {
  constructor() {
    super();

    this.renderLastEntry = this.renderLastEntry.bind(this);
  }

  renderLastEntry() {
    const lastEntry = this.props.entries[this.props.entries.length - 1];
    const currentUnits = this.props.currentUnits;
    const labels = labelNames(currentUnits);
    return (
      <div className="wrapper">
              <div className="column-placement alt">
          <div className="grid-container shadow">
          <div className="grid-item text-dec">Your Usage:</div>
            <div className="grid-item"></div>
            <div className="grid-item">Annual {labels.distance}:</div>
            <div className="grid-item">{convertDistance(lastEntry.miles, currentUnits) * 52}</div>
            <div className="grid-item">{labels.mileage}:</div>  
            <div className="grid-item">{calculateCO2(lastEntry.miles, currentUnits)}tonne</div>
            <div className="grid-item">{labels.cost}:</div>
            <div className="grid-item">£{calculateCost(lastEntry.miles, currentUnits)}</div>
          </div>

          <div className="grid-container shadow">
          <div className="grid-item text-dec">EV Comparison:</div>
            <div className="grid-item"></div>
            <div className="grid-item">Annual {labels.distance}:</div>
            <div className="grid-item">{convertDistance(lastEntry.miles, currentUnits) * 52}</div>
            <div className="grid-item">{labels.mileage}:</div>  
            <div className="grid-item">{ev(lastEntry.miles, currentUnits)}tonne</div>
            <div className="grid-item">{labels.cost}:</div>
            <div className="grid-item">£{evCost(lastEntry.miles, currentUnits)}</div>
          </div>
        </div>
  
       <div className="saving">
          You could save {" "} 
         £<AnimatedNumber 
value ={calculateCost(lastEntry.miles, currentUnits)-evCost(lastEntry.miles, currentUnits)} 

duration={200}
/>
{" "} and {" "}
<AnimatedNumber value={calculateCO2(lastEntry.miles, currentUnits)}
duration={200}
/>tonne of CO2 Annually
        </div>
      </div>
      
    )
  }
 

  render() {
    const hasEntries = this.props.entries.length > 0;
    return hasEntries && this.renderLastEntry()
  }

  static PropTypes = {
    entries: PropTypes.array.isRequired,
    currentUnits: PropTypes.string.isRequired
  }
}