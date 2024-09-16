import React, { Component, ChangeEvent, MouseEvent } from "react";
import { GuestBasic, replaceDiet, replacePlusKind, replacePlusName, replacePlusDiet } from './Guest';

type GuestDetailsProps = {
  addGuest: GuestBasic;
  onSaveClick: (guest: GuestBasic) => void;
  onBackClick: () => void;
};

type GuestDetailsState = {
    currGuest: GuestBasic
    plusOne: "0" | "1" |"unknown";

    error: string;
};


/** Displays the questions to change the guest details */
export class GuestDetails extends Component<GuestDetailsProps, GuestDetailsState>{
    constructor(props: GuestDetailsProps) {
        super(props);

        this.state = {currGuest: this.props.addGuest, plusOne: "unknown", error: ""};
      }
      
      renderError = (): JSX.Element => {
        if (this.state.error === "") {
        return <div></div>; // show nothing
        } else {
        return <div><b>Error</b>: {this.state.error}</div>;
        }
       };

       renderPlusOne = (): JSX.Element => {
        if (this.state.currGuest.plusKind === "unknown" ||this.state.currGuest.plusKind === "0") {
        return <div></div>; // show nothing
        } else {
        return <div>
          <div>
          <label htmlFor="plusOnename">Guest Name</label>
          <input id="plusOnename" type="text" value={this.state.currGuest.plusName}
              onChange={this.doPlusOneNameChange}></input>
          </div>
          <div>
          <label htmlFor="plusOnediet">Guest Dietary Restrictions ('none' if none)</label>
          <input id="plusOnediet" type="text" value={this.state.currGuest.plusDiet}
              onChange={this.doPlusOneDietChange}></input>
          </div>
        </div>;
        }
       };


      render = (): JSX.Element => {
        
        const prelimDetails: string = this.state.currGuest.name + ", guest of " + 
                            this.state.currGuest.guestOf + ", " + "family : " + this.state.currGuest.family;
        {this.renderError()}
        return <div>
          <h2>{prelimDetails}</h2>
          <div>
          <label htmlFor="dietrestrictions">Dietary Restrictions ('none' if none)</label>
          <input id="dietrestrictions" type="text" value={this.state.currGuest.diet}
              onChange={this.doDietChange}></input>
          <div>
          <label>Plus One?: </label>
          <select 
          name="Dropdown"
          id = "dropdown2"
          value = {this.state.currGuest.plusKind}
          onChange={this.doPlusOneClick}
          >
          <option value="unknown"> unknown </option>
          <option value="0"> 0 </option>
          <option value="1"> 1 </option>
          </select>
          </div>
          {this.renderPlusOne()}
          </div>
          <button type="button" onClick={this.doSaveClick}>Save</button>
          <button type="button" onClick={this.doBackClick}>Back</button>
          </div>;
      };   

      //Sets the guests dietary restrictions 
      doDietChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({currGuest: replaceDiet(this.state.currGuest, evt.target.value), error: ""});
      };

      //Figures out of guest has a plus one or not - adds known guests to count
      doPlusOneClick = (evt: ChangeEvent<HTMLSelectElement>): void => {
        if (evt.target.value === "unknown" ||evt.target.value === "0" ||evt.target.value === "1"){
        this.setState({error: "", currGuest: replacePlusKind(this.state.currGuest, evt.target.value)});
        }
      };

      //Adds the plus one's name (if there is a plus one)
      doPlusOneNameChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ error: "", currGuest: replacePlusName(this.state.currGuest, evt.target.value)});
      };

      //Adds the plus one's diet (if there is a plus one)
      doPlusOneDietChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        this.setState({ error: "", currGuest: replacePlusDiet(this.state.currGuest, evt.target.value)});
      };

      //Checks for errors when save is clicked.
      doSaveClick = (_: MouseEvent<HTMLButtonElement>): void => {
        if (this.state.currGuest.diet.trim().length === 0 ) {
          this.setState({error: "name is missing"});
          return;
        }
        if(this.state.currGuest.plusKind === "1"){
          if (this.state.currGuest.plusName.trim().length === 0 ) {
            this.setState({error: "plus one name is missing"});
            return;
          }
          if (this.state.currGuest.plusDiet.trim().length === 0 ) {
            this.setState({error: "plus one diet is missing"});
            return;
          }
        } 
        this.props.onSaveClick(this.state.currGuest);
        return;
      }
      //Tells the parent that the back button was clicked
      doBackClick = (_: MouseEvent<HTMLButtonElement>): void => {
        this.props.onBackClick();
      }
}