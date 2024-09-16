import { AssocList } from "./assoc";
import { GuestBasic} from "./Guest";

export type Summary = {
    mollyFamily: number;
    mollyMinGuests: number;
    mollyMaxGuests: number;
    jamesFamily: number;
    jamesMinGuests: number;
    jamesMaxGuests: number;
  };
  
  /** 
 * Computes a summary of all of the guests in the guest list
 * @param guests of the assoclist of all of the guests
 * @returns summary of guests 
 */
  export const computeSummary = (guests: AssocList<GuestBasic>): Summary => {

    return recursiveCompute(guests, 0, 0, 0, 0, 0, 0)
  }

//is the helper function for compute summary, computes the summary using recursion
    const recursiveCompute = (guests: AssocList<GuestBasic>, mollyFamily: number, mollyMinGuests: number, mollyMaxGuests: number,
        jamesFamily: number, jamesMinGuests: number, jamesMaxGuests: number): Summary => {
        if(guests.kind !== "nil"){
            const interim = guests.hd;
            const currGuest = interim[1];
            if(currGuest.guestOf == "molly"){
                if(currGuest.plusKind === "unknown"){
                    if(currGuest.family === "true"){
                        return recursiveCompute(guests.tl, mollyFamily + 1, mollyMinGuests + 1, mollyMaxGuests +2, jamesFamily, jamesMinGuests, jamesMaxGuests);
                    } else{
                        return recursiveCompute(guests.tl, mollyFamily, mollyMinGuests + 1, mollyMaxGuests +2, jamesFamily, jamesMinGuests, jamesMaxGuests);
                    }
                } else if (currGuest.plusKind === "0"){
                    if(currGuest.family === "true"){
                        return recursiveCompute(guests.tl, mollyFamily + 1, mollyMinGuests + 1, mollyMaxGuests +1, jamesFamily, jamesMinGuests, jamesMaxGuests);
                    } else{
                        return recursiveCompute(guests.tl, mollyFamily, mollyMinGuests + 1, mollyMaxGuests +1, jamesFamily, jamesMinGuests, jamesMaxGuests);
                    }
                } else{
                    if(currGuest.family === "true"){
                        return recursiveCompute(guests.tl, mollyFamily + 1, mollyMinGuests + 2, mollyMaxGuests +2, jamesFamily, jamesMinGuests, jamesMaxGuests);
                    } else{
                        return recursiveCompute(guests.tl, mollyFamily, mollyMinGuests + 2, mollyMaxGuests +2, jamesFamily, jamesMinGuests, jamesMaxGuests);
                    }
                }

            } else if(currGuest.guestOf == "james"){
                if(currGuest.plusKind === "unknown"){
                    if(currGuest.family === "true"){
                        return recursiveCompute(guests.tl, mollyFamily, mollyMinGuests, mollyMaxGuests, jamesFamily + 1, jamesMinGuests + 1, jamesMaxGuests +2);
                    } else{
                        return recursiveCompute(guests.tl, mollyFamily, mollyMinGuests, mollyMaxGuests, jamesFamily, jamesMinGuests + 1, jamesMaxGuests + 2);
                    }
                } else if (currGuest.plusKind === "0"){
                    if(currGuest.family === "true"){
                        return recursiveCompute(guests.tl, mollyFamily, mollyMinGuests, mollyMaxGuests, jamesFamily + 1, jamesMinGuests + 1, jamesMaxGuests +1);
                    } else{
                        return recursiveCompute(guests.tl, mollyFamily, mollyMinGuests , mollyMaxGuests, jamesFamily, jamesMinGuests+1, jamesMaxGuests+1);
                    }
                } else{
                    if(currGuest.family === "true"){
                        return recursiveCompute(guests.tl, mollyFamily , mollyMinGuests, mollyMaxGuests, jamesFamily+1, jamesMinGuests+2, jamesMaxGuests+2);
                    } else{
                        return recursiveCompute(guests.tl, mollyFamily, mollyMinGuests, mollyMaxGuests, jamesFamily, jamesMinGuests+2, jamesMaxGuests+2);
                    }
                }
            }
        } else{
            return {mollyFamily, mollyMinGuests, mollyMaxGuests, jamesFamily, jamesMinGuests, jamesMaxGuests};
        }
        return {mollyFamily, mollyMinGuests, mollyMaxGuests, jamesFamily, jamesMinGuests, jamesMaxGuests}; 
    
    }