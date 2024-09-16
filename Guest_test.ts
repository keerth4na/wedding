import * as assert from 'assert';
import { toJson, fromJson, GuestBasic, replaceDiet, replaceFamily, replaceGuestOf, replaceName, replacePlusKind, replacePlusName, replacePlusDiet} from './Guest';



const Guest: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "harry", plusDiet: "eggs" };
const Guest1: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  };
const Guest2: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "unknown", plusName: "", plusDiet: ""  };



describe('guest', function() {
  it('toJson', function() {
    assert.deepStrictEqual(toJson(Guest), ["hello", "molly", "true", "hi", "1", "harry", "eggs"]);
    assert.deepStrictEqual(toJson(Guest1), ["hello", "molly", "true", "hi", "0", "", ""]);
    assert.deepStrictEqual(toJson(Guest2), ["hello", "molly", "true", "hi", "unknown", "", ""])
  });

  it('fromJson', function() {
    assert.deepStrictEqual(fromJson(["hello", "molly", "true", "hi", "1", "harry", "eggs"]), Guest);
    assert.deepStrictEqual(fromJson(["hello", "molly", "true", "hi", "0", "", ""]), Guest1);
    assert.deepStrictEqual(fromJson(["hello", "molly", "true", "hi", "unknown", "", ""]), Guest2);
  });

  

  it('replaceDiet', function() {
    const Guest3: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "unknown", plusName: "", plusDiet: ""  };


    //straight  line code 
    assert.deepStrictEqual(replaceDiet(Guest3, "none"), {name: "hello", guestOf: "molly", family: "true", diet: "none", plusKind: "unknown", plusName: "", plusDiet: ""  });
    assert.deepStrictEqual(replaceDiet(Guest3, "no chicken"), {name: "hello", guestOf: "molly", family: "true", diet: "no chicken", plusKind: "unknown", plusName: "", plusDiet: ""  });

  });

  it('replaceFamily', function() {
    const Guest4: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  };
    
    //straight  line code 
    assert.deepStrictEqual(replaceFamily(Guest4, "false"), {name: "hello", guestOf: "molly", family: "false", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  });
    assert.deepStrictEqual(replaceFamily(Guest4, "true"), {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  });

  });

  it('replaceGuestOf', function() {
    const Guest5: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "unknown", plusName: "", plusDiet: ""  };

    
    //straight  line code 
    assert.deepStrictEqual(replaceGuestOf(Guest5, "james"), {name: "hello", guestOf: "james", family: "true", diet: "hi", plusKind: "unknown", plusName: "", plusDiet: ""  });
    assert.deepStrictEqual(replaceGuestOf(Guest5, "molly"), {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "unknown", plusName: "", plusDiet: ""  });
  });

  it('replaceName', function() {
    const Guest6: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  };
    
    //straight  line code 
    assert.deepStrictEqual(replaceName(Guest6, "james"), {name: "james", guestOf: "molly", family: "true", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  });
    assert.deepStrictEqual(replaceName(Guest6, "molly"), {name: "molly", guestOf: "molly", family: "true", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  });
  });

  it('replacePlusKind', function() {
    const Guest6: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "0", plusName: "", plusDiet: ""  };
    
    //straight  line code 
    assert.deepStrictEqual(replacePlusKind(Guest6, "1"), {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "", plusDiet: ""  });
    assert.deepStrictEqual(replacePlusKind(Guest6, "unknown"), {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "unknown", plusName: "", plusDiet: ""  });
  });

  it('replacePlusName', function() {
    const Guest6: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "", plusDiet: ""  };
    
    //straight  line code 
    assert.deepStrictEqual(replacePlusName(Guest6, "james"), {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "james", plusDiet: ""  });
    assert.deepStrictEqual(replacePlusName(Guest6, "molly"), {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "molly", plusDiet: ""  });
  });

  it('replacePlusDiet', function() {
    const Guest6: GuestBasic = {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "james", plusDiet: ""  };
    
    //straight  line code 
    assert.deepStrictEqual(replacePlusDiet(Guest6, "none"), {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "james", plusDiet: "none"  });
    assert.deepStrictEqual(replacePlusDiet(Guest6, "no egg"), {name: "hello", guestOf: "molly", family: "true", diet: "hi", plusKind: "1", plusName: "james", plusDiet: "no egg"  });
  });

  
});