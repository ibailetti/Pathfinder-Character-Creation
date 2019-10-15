const _ = require('lodash');

const characRace = {
    1: "Elf",
    2: "Dwarf",
    3: "Human"
}

const characClass = {
    1: "Cleric",
    2: "Warrior",
    3: "Mage",
    4: "Rogue"
}

const characAttributes = {
    1: "Strengh",
    2: "Dexterity",
    3: "Constitution",
    4: "Inteligence",
    5: "Wisdom",
    6: "Charisma"
}

const qRaces = _.size(characRace);
const qClasses = _.size(characClass);
const qAttributes = _.size(characAttributes);

const THROW_CONFIG = {
    qDices: 4,
    bestRolls: 3,
    diceType: 6
}

function selectRace(qRaces) {
    let dice = Math.floor((Math.random() * qRaces) + 1);
    //console.log(characRace[dice]);
    return characRace[dice];
}

function selectClass(qClasses) {
    let dice = Math.floor((Math.random() * qClasses) + 1);
    //console.log(characClass[dice]);
    return characClass[dice];
}

function rollDices(qDices, best = 1, type, times = 1) {
    let result = [];
    do {
        let roll = [];
        do {
            let dice = Math.floor((Math.random() * type) + 1);
            roll.push(dice);
        } while (roll.length < qDices);
        roll = _.sortBy(roll).reverse().slice();
        result.push(_(roll).take(best).sum());
    } while (result.length < times);
    result = _.sortBy(result).reverse().slice();
    result = _.shuffle(result);
    return (result);
}

function setAttributes(throwConfig, qAttributes) {
    let newAttributes = {};
    let { qDices: a } = throwConfig;
    let { bestRolls: b } = throwConfig;
    let { diceType: c } = throwConfig;
    let values = rollDices(a, b, c, qAttributes);

    _.forEach(characAttributes, (value, key) => {
        //console.log(`${key} : ${value}`);        
        newAttributes[value] = values[key];
    });

    return newAttributes;
}

module.exports = {
    newCharacter: () => {
        let character = {};
        character['Race'] = selectRace(qRaces);
        character['Class'] = selectClass(qClasses);
        character['Attributes'] = setAttributes(THROW_CONFIG, qAttributes);
        return character;
    }
}

/* function newCharacter() {
    let character = {};
    character['Race'] = selectRace(qRaces);
    character['Class'] = selectClass(qClasses);
    character['Attributes'] = setAttributes(THROW_CONFIG, qAttributes);
    return character;
} */
//console.log(JSON.stringify(newCharacter()));