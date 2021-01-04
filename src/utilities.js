// All the functions and calculations have been done in utilities.js then imported into the main component
// Calculating the co2 used per week multiplied by the amount of weeks a year
// Switch statement applied to change the amount of co2 when type of vehicle (currentUnits) changed
// The value has been multiplied by 1e-6 to convert it to metric tonne
function calculateCO2(mile, currentUnits) {
  mile = parseFloat(mile);
  let mileage;
  switch (currentUnits) {
    case 'Car/ Light Van':
      mileage =( (mile * 130) * 52) * 1e-6;
      break;
    case 'Medium Van':
      mileage = ((mile * 290) * 52) * 1e-6;
      break;
      case 'Large Van':
        mileage = ((mile * 400) * 52) * 1e-6;
        break;
    default:
      mileage = ((mile * 130) * 52) * 1e-6;
  }
  return mileage.toFixed(2);
}

// declating the value of ev co2 usage per vehicle using switch statement
// ev value is the same but the statement been used to show the ability to change value with each type of car
function ev(mile, units) {
    mile = parseFloat(mile);
  let ev;
  switch (units) {
    case 'Car/ Light Van':
      ev = 0;
      break;
    case 'Medium Van':
      ev = 0;
      break;
      case 'Large Van':
        ev = 0;
        break;
    default:
      ev = 0;
  }
  return ev.toFixed(2);
}
// Calculating the cost of mileage multiplied by the ev data provided for each different type of car multiplied by the number of weeks a year
function evCost(mile, units) {
  mile = parseFloat(mile);
let evcost;
switch (units) {
  case 'Car/ Light Van':
    evcost = (mile * 0.05) * 52;
    break;
  case 'Medium Van':
    evcost = (mile * 0.09) * 52;
    break;
    case 'Large Van':
      evcost = (mile * 0.12) * 52;
      break;
  default:
    evcost = (mile * 0.05) * 52;
}
return evcost.toFixed(2);
}
// Calculating the cost per mileage using the miles data provided for each type of car multiplied by the number of weeks per year
function calculateCost(mile, units) {
    mile = parseFloat(mile);
  let cost;
  switch (units) {
    case 'Car/ Light Van':
      cost = (mile * 0.12) * 52;
      break;
    case 'Medium Van':
      cost = (mile * 0.18) * 52;
      break;
      case 'Large Van':
        cost = (mile * 0.22) * 52;
        break;
    default:
      cost = (mile * 0.12) * 52;
  }
  return cost.toFixed(2);
}

// Assigning labelNames for the types of car for each scenario we have (using a switch statement)
function labelNames(units) {
  switch (units) {
    case 'Car/ Light Van':
      return {Type: "Car/ Light Van" ,distance: "Miles",  mileage: "CO2 used", cost: "Cost", evcost: "Cost"};
    case 'Medium Van':
      return {Type: "Medium Van", distance: "Miles",  mileage: "CO2 used", cost: "Cost", evcost: "Cost"};
      case 'Large Van':
        return {Type: "Large Van", distance: "Miles",  mileage: "CO2 used", cost:"Cost", evcost: "Cost"};
    default:
      return {Type: "Car/ Light Van", distance: "Miles", mileage: "CO2 used", cost:"Cost", evcost: "Cost"};
  }
}

// Assigning the distance value of miles which later multiplied by the number of weeks a year in the LastEntry
function convertDistance(miles, units, invert = false) {
  miles = parseFloat(miles);
  let distance = miles;
  switch (units) {
    case 'Car/ Light Van':
      distance = miles ;
            break;
    case 'Medium Van':
  distance = miles;
        break;
      case 'Large Van':
      distance = miles;
      break;
    default:
  }
  return distance.toFixed(2);
}






export {calculateCO2, ev, evCost, calculateCost,labelNames, convertDistance};
