import React, { Component} from "react";
import { GuestList } from './GuestList';
import { AddGuest } from './AddGuest';
import { GuestDetails } from './GuestDetails';
import { GuestBasic} from './Guest';
import { AssocList} from "./assoc";
import { nil, cons} from "./list";
import { saveFile, loadFile, listFiles} from './server';

//Describes the possible app page views 
type Page ={kind: 'list'} |{kind: 'add'} |{kind: 'details'};

type WeddingAppState = {
  show: Page; //Stores state of the current page of the app 
  nameList: Array<string>;
  guests: AssocList<GuestBasic>;
  currGuest: GuestBasic;
  currName: string;
  
 }
// 
// /** Displays the UI of the Wedding rsvp application. */
 export class WeddingApp extends Component<{}, WeddingAppState> {
 
   constructor(props: {}) {
     super(props);

     const zeroGuest: GuestBasic = {name: "", guestOf: "...", family: "false", diet: "", plusKind: "unknown", plusName: "", plusDiet: "" };
 
     this.state = {show: {kind: 'list'}, nameList:[], currGuest: zeroGuest, currName: "", guests: nil};
     listFiles(this.doListCallBackClick);    
   }
   
   render = (): JSX.Element => {
     if (this.state.show.kind === 'list'){
      return <GuestList nameList={this.state.nameList}  onNameClick={this.doNameClick} guests={this.state.guests} onAddClick = {this.doAddClick}/>;
     } else if (this.state.show.kind === 'add'){
      return <AddGuest onSaveClick={this.doSaveClick} onBackClick={this.doBackClick}/>;
     } else{
      return <GuestDetails addGuest= {this.state.currGuest} onSaveClick={this.doSaveClick} onBackClick={this.doBackClick} />;
            
     }
   };

  //is to load the assoclist containing guest details (another call back for load)
  doNameLoadCallBackClick = (name: string, guest: GuestBasic | null): void => {
    if (guest) {
      this.setState({ guests: cons([name, guest], this.state.guests)});
    }
  };

  //is for when a name is clicked
  doNameClick = (name: string): void => {
    loadFile(name, this.doLoadCallBackClick);
  };

  //call back for load
  doLoadCallBackClick = (name: string, guest: GuestBasic | null): void => {
    if (guest) {
      this.setState({show:{kind: "details"}, currGuest: guest , currName: name});
    }
  }

  //for when the save button is clicked
  doSaveClick = (thisGuest: GuestBasic): void => {
    this.setState({currGuest: thisGuest});
    saveFile(this.state.currGuest.name, thisGuest, this.doSaveCallBackClick);
  };

  //call back for do save click
  doSaveCallBackClick = (name: string, _saved: boolean): void => {
    console.log(name + " saved");
  }

  //Goes back to the starting page 
  doBackClick = (): void => {
    this.setState({show: {kind: "list"}});
  };

  //goes to the page to add a guest
  doAddClick = (): void =>{
    this.setState({show: {kind: "add"} })
  };

  //call back for names
  doListCallBackClick = (names: string[]): void => {
    this.setState({nameList: names});
    const list = names;
    for (const name of list) {
      loadFile(name, this.doNameLoadCallBackClick);
    }
  }
 }

