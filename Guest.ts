



export type GuestBasic =
    | {readonly name: string, readonly guestOf: "..." |"molly" | "james", readonly family: "true" | "false", 
        readonly diet: string, readonly plusKind: "unknown" | "1" | "0", readonly plusName: string, readonly plusDiet: string}

/** 
 * Replaces the name 
 * @param g for which the name is being changed
 * @param n for the name which will be set
 * @returns new g that has the new name
 */
export const replaceName = (g: GuestBasic, n: string): GuestBasic => {
  return {name: n, guestOf: g.guestOf, family: g.family, diet: g.diet, plusKind: g.plusKind, plusName: g.plusName, plusDiet: g.plusDiet};
};

/** 
 * Replaces the guestOf 
 * @param g for which the guestOF is being changed
 * @param n for who the guest is a guestOF
 * @returns new g that has the new guestOf
 */
export const replaceGuestOf = (g: GuestBasic, n: "molly" | "james"): GuestBasic => {
  return {name: g.name, guestOf:n, family: g.family, diet: g.diet, plusKind: g.plusKind, plusName: g.plusName, plusDiet: g.plusDiet};
};

/** 
* Replaces the family 
 * @param g for which the family is being changed
 * @param f for if the guest is family or not
 * @returns new g that has the new family
 */
export const replaceFamily = (g: GuestBasic, f: "true" | "false"): GuestBasic => {
  return {name: g.name, guestOf:g.guestOf, family: f, diet: g.diet, plusKind: g.plusKind, plusName: g.plusName, plusDiet: g.plusDiet};
};

/** 
* Replaces the diet 
 * @param g for which the diet is being changed
 * @param d for the diet which will be set
 * @returns new g that has the new diet
 */
export const replaceDiet = (g: GuestBasic, d: string): GuestBasic => {
  return {name: g.name, guestOf:g.guestOf, family: g.family, diet: d, plusKind: g.plusKind, plusName: g.plusName, plusDiet: g.plusDiet};
};

/** 
* Replaces the plusOne kind  
 * @param g for which the plusOne is being changed
 * @param n  for the status of the plus one 
 * @returns new g that has the new plusOne
 */
export const replacePlusKind = (g: GuestBasic, d: "0" | "1" | "unknown"): GuestBasic => {
  return {name: g.name, guestOf:g.guestOf, family: g.family, diet: g.diet, plusKind: d, plusName: g.plusName, plusDiet: g.plusDiet};
};

/** 
* Replaces the name of the plusOne 
 * @param g for which the plusOne name is being changed
 * @param n  for the name of the plus one 
 * @returns new g that has the new name
 */
export const replacePlusName = (g: GuestBasic, n: string): GuestBasic => {
  return {name: g.name, guestOf:g.guestOf, family: g.family, diet: g.diet, plusKind: g.plusKind, plusName: n, plusDiet: g.plusDiet};
};

/** 
* Replaces the diet 
 * @param g for which the diet is being changed
 * @param d for the diet which will be set
 * @returns new g that has the new diet
 */
export const replacePlusDiet = (g: GuestBasic, d: string): GuestBasic => {
  return {name: g.name, guestOf:g.guestOf, family: g.family, diet: g.diet, plusKind: g.plusKind, plusName: g.plusName, plusDiet: d};
};

/** 
 * Creats a JSON representation of given basic guest info. 
 * @param g to convert to JSON
 * @returns JSON describing the given basic guest info
 */
export const toJson = (g: GuestBasic): unknown => {
    return [g.name, g.guestOf, g.family ,g.diet, g.plusKind, g.plusName, g.plusDiet];
  };
  
  /** 
   * Converts a JSON description to the basic guest info it describes. 
   * @param data in JSON form to try to parse as basic guest info
   * @returns the basic guest info parsed from given data
   */
  export const fromJson = (data: unknown): GuestBasic => {
    if (Array.isArray(data)) {
      if (data.length === 7) {
        return guestOf((data[0]), (data[1]),
                     (data[2]), (data[3]), (data[4]), (data[5]), data[6]);
      } else {
        throw new Error('split must have 5 parts');
      }
    } else {
      throw new Error(`type ${typeof data} is not a valid square`);
    }
  }


/** 
 * Returns a GuestInfo that splits into the five given parts. 
 * @param name name of the guest
 * @param guestOf: the person who the guest is of
 * @param family: if the guest is family or not
 * @param diet: any dietary restrictions the guest has
 * @param plusOne: the plus one type (either plus one info or info of the guest)
 * @returns new square composed of given squares
 */
export const guestOf =
    (name: string,  guestOf: "..." |"molly" | "james",  family: "true" | "false", diet: string,  plusKind: "unknown" | "1" | "0",  plusName: string,  plusDiet: string): GuestBasic => {
    return {name: name, guestOf: guestOf, family: family, diet: diet, plusKind: plusKind, plusName: plusName, plusDiet: plusDiet};
};


