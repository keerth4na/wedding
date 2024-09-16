import React, { Component} from "react";
import { AssocList, get_value, contains_key} from "./assoc";
import { GuestBasic} from "./Guest";
import { computeSummary} from "./summary";

type GuestListProps = {
    nameList: Array<string>;
    onNameClick: (name: string) => void;
    onAddClick: () => void;
    guests: AssocList<GuestBasic>;
};



type GuestListState = {
    fileClick: boolean; //if add guest was clicked or not 
};


/** Displays the list of guests */
export class GuestList extends Component<GuestListProps, GuestListState>{
    constructor(props: GuestListProps) {
        super(props);
    
        this.state = {fileClick: false};
        console.log(this.props.guests)
      }
      renderSummary = (): JSX.Element => {
        const stats: {mollyFamily: number, mollyMinGuests:number, mollyMaxGuests: number 
        jamesFamily:number, jamesMinGuests:number, jamesMaxGuests: number} = 
        computeSummary(this.props.guests);
        
        return <div>
        {(stats.mollyMinGuests + " - " + (stats.mollyMaxGuests) ) +
        " guest(s) of Molly (" + stats.mollyFamily + " family)"}<br></br>
        {(stats.jamesMinGuests + " - " + (stats.jamesMaxGuests)) +
        " guest(s) of James (" + stats.jamesFamily + " family)"}
        </div>
      }
      render = (): JSX.Element => {
        const savedNames = this.props.nameList;
        const fileItems: JSX.Element[] = [];
        for (const name of savedNames) {
          const guest = contains_key(name, this.props.guests);
      
          if (guest) { // Ensure guest data exists
            const guest = get_value(name, this.props.guests);
            fileItems.push(
              <li key={name}>
                <a href="#" onClick={() => this.props.onNameClick(name)}>
                  {name} 
                </a>
                <span> guest of: {guest.guestOf} +{guest.plusKind}</span>
              </li>
            );
          } else {
            // Handle the case where guest data is not found (optional)
            fileItems.push(
              <li key={name}>
                <a href="#" onClick={() => this.props.onNameClick(name)}>
                  {name} 
                </a>
                <span> guest data still loading - please refresh page</span>
              </li>
            );
          }
        }
      
    
      
      return <div>
          <h3>Guest List</h3>
        <ul>
          {fileItems}
        </ul>
        <h3>Summary</h3>
        <ul>
          {this.renderSummary()}
        </ul>
        
        
        <button type="button" onClick={this.props.onAddClick}>Add Guest</button>
        </div>;
      };
    

}