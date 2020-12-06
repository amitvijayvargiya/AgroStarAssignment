import React, { Component } from 'react';
import axios from 'axios';
import './App.css';


export class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        responseList : [],
        selectedOptions : {}
    }
  }

  componentDidMount(){
        axios.get(`http://www.mocky.io/v2/5cff79fc3200007100eac68f`)
          .then((response)=>{
              let responseData = response.data.responseData;
              this.setState({
                responseList : responseData
              })
          },(error)=>{
            console.log('Error', error);
          });
  }

  const OptionsList = ({ options, selectedOptions, onChange }) => {
 
    const handleCheckboxClicked = (selectedOptionId) => {
      // is currently selected
      if(selectedOptions[selectedOptionId]){
        // remove selected key from options list
        delete selectedOptions[selectedOptionId]; 
      } else { // is not currently selected
        // Add selected key to optionsList
        selectedOptions[selectedOptionId] = {} 
      }
      // call onChange function given by parent
      onChange(selectedOptions) 
    }
    
    const handleSubOptionsListChange = (optionId, subSelections) => {
      // add sub selections to current optionId
      selectedOptions[optionId] = subSelections;
      // call onChange function given by parent
      onChange(selectedOptions);
    }
    
    return (
      <div>
        {options.map(option => (
          <ul>
            <Checkbox 
              selected={selectedOptions[option.source]} 
              label={option.source} 
              onChange={() => {handleCheckboxClicked(option.source)}}
             />
            {/* Base Case */}
            {(option.subOptions.length > 0 && selectedOptions[option.source]) &&
              <OptionsList
                options={option.children}
                selectedOptions={selectedOptions[option.source]} 
                onChange={(subSelections) => handleSubOptionsListChange(option.source, subSelections)}
               />
            }
          </ul>
        ))}
      </div>
    )
  };
  
  // Dumb checkbox component, completly controlled by parent
  const Checkbox = ({ selected, label, onChange }) => {
    return (
      <div class="checkbox-container">
        <input type="checkbox" name="treeChecked" id="treeChecked" class="css-checkbox" className="css-checkbox" onClick={() => onChange(!selected)} />
           <label for="treeChecked" class="css-label">
              <span class="fa fa-plus">{label}</span>
              <span class="fa fa-minus">{label}</span>
            </label>

      </div>
    )
  };

  render() {
    return (
      <div className="App">
            <h1>Agro Star Assignment</h1>
            <OptionsList
                  options = {this.state.responseList}
                  onChange = {(selectedOptions) => this.setState({selectedOptions})}
                  selectedOptions = {this.state.selectedOptions}
            />
      </div>
    )
  }
}

export default App;

