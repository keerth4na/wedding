import * as assert from 'assert';
import { GuestBasic} from './Guest';
import { Summary, computeSummary } from './summary';
import {nil, cons} from './list';



const Guest: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "harry", plusDiet: "eggs" };
const Guest1: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  };
const Guest2: GuestBasic = {name: "hello", guestOf: "james", family: "true", diet: "hi", plusKind: "unknown", plusName: "", plusDiet: ""  };
const sumBasic: Summary = {mollyFamily: 2, mollyMinGuests: 3, mollyMaxGuests: 3, jamesFamily: 1, jamesMinGuests: 1, jamesMaxGuests: 2  }

describe('summary', function() {
  
  it('computeSummary', function() {
    
    
    //0-1-many heuristic
    assert.deepStrictEqual(computeSummary(cons(["hi", Guest], nil)) ,{mollyFamily: 1, mollyMinGuests: 2, mollyMaxGuests: 2, jamesFamily: 0, jamesMinGuests: 0, jamesMaxGuests: 0 });
    assert.deepStrictEqual(computeSummary(cons(["hi", Guest2], nil)), {mollyFamily: 0, mollyMinGuests: 0, mollyMaxGuests: 0, jamesFamily: 1, jamesMinGuests: 1, jamesMaxGuests: 2 });

    assert.deepStrictEqual(computeSummary(cons(["hi", Guest], cons(["hi", Guest2], nil))) ,{mollyFamily: 1, mollyMinGuests: 2, mollyMaxGuests: 2, jamesFamily: 1, jamesMinGuests: 1, jamesMaxGuests: 2});
    assert.deepStrictEqual(computeSummary(cons(["hi", Guest1], cons(["hi", Guest2], nil))), {mollyFamily: 1, mollyMinGuests: 1, mollyMaxGuests: 1, jamesFamily: 1, jamesMinGuests: 1, jamesMaxGuests: 2 });

    assert.deepStrictEqual(computeSummary(cons(["hey", Guest1], cons(["hi", Guest], cons(["hi", Guest2], nil)))) ,sumBasic);
    assert.deepStrictEqual(computeSummary(cons(["hey", Guest1], cons(["hi", Guest], cons(["hi", Guest2], nil)))) ,sumBasic);
  });

  
});