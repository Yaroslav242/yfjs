// Create unit based on flying constructor
const uley = new UnitType("uley");

// Make the constructor default payload unit's
uley.constructor = () => PayloadUnit.create();

// Set ID as 71 so reloads do not lose the unit
EntityMapping.idMap[71] = uley.constructor;

// export to spore-units.js
exports.uley_unit = uley;
