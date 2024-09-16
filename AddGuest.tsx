import React, { Component, ChangeEvent, MouseEvent } from "react";
import {GuestBasic, replaceFamily, replaceGuestOf, replaceName} from './Guest';

type AddGuestProps = {
  onSaveClick: (guest: GuestBasic) => void,
  onBackClick: () => void;
};

type AddGuestState = {
    currGuest: GuestBasic
    error: string; 
};


/** Displays the add guest screen to add a guest to the guest list */
export class AddGuest extends Component<AddGuestProps, AddGuestState>{
    constructor(props: AddGuestProps) {
        super(props);

        const zeroGuest: GuestBasic = {name: "", guestOf: "...", family: "false", diet: "", plusKind: "unknown", plusName: "", plusDiet: "" };
    
        this.state = {currGuest: zeroGuest, error: ""};
      }
      
      renderError = (): JSX.Element => {
        return this.state.error ? <div><h2>Error</h2>: {this.state.error}</div> : <div></div>;
      }

      render = (): JSX.Element => {
        {this.renderError()}
        return <div>
        <h2>Add Guest</h2>
        <div>
          <label htmlFor="name">Guest Name: </label>
          <input id="name" type="text" onChange={this.doNameChange}></input>
        </div>
        <div>
        <label>Guest Of: </label>
          <select 
            name="Dropdown"
            id = "dropdown1"
            onChange={this.doGuestOfChange}
            >
              <option value="..."> ... </option>
              <option value="molly"> Molly </option>
              <option value="james"> James </option>
            </select>
        </div>
        <div>
        <label>Family?: </label>
        <select 
        name="Dropdown"
        id = "dropdown2"
        onChange={this.doFamilyChange}
        >
          <option value="..."> ...</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        </div>
        <button type="button" onClick={this.doSaveClick}>Save</button>
        <button type="button" onClick={this.doBackClick}>Back</button>
        </div>
        ;
      };
      
      //When a name gets inputted sets name to the inputted name 
      doNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({currGuest: replaceName(this.state.currGuest, evt.target.value), error: ""});
      };

      //When "guest of" gets changed
      doGuestOfChange = (evt: ChangeEvent<HTMLSelectElement>): void =>{
        if(evt.target.value === "molly" || evt.target.value === "james"){
          this.setState({currGuest: replaceGuestOf(this.state.currGuest, evt.target.value)});
        }
      }

      //When the family button gets selected 
      doFamilyChange = (evt: ChangeEvent<HTMLSelectElement>): void => {
        if(evt.target.value === "true"){
          this.setState({currGuest: replaceFamily(this.state.currGuest, "true")})
        }
      }

      //When the save button is clicked, checks for errors
      doSaveClick = (_: MouseEvent<HTMLButtonElement>): void => {
        // Verify that the user entered all required information.
        console.log(this.state.currGuest.name);
        if (this.state.currGuest.name.trim().length === 0 ) {
          this.setState({error: "name is missing"});
          console.log("mising name")
          return;
        }
        if (this.state.currGuest.guestOf === "...") {
            this.setState({error: "guest of _ is missing"});
            console.log("mising guest")
            return;
        }
        this.props.onSaveClick(this.state.currGuest);
      }

    //Tells the parent that the back button was clicked
    doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
        this.props.onBackClick();
    }



      
}