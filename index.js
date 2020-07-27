const orderListNode = document.getElementsByClassName('household')[0];

const addButtonNode = document.getElementsByClassName('add')[0];
addButtonNode.addEventListener('click', addPersonToHousehold);

const submitButtonNode = document.querySelector("button[type='submit']");
submitButtonNode.addEventListener('click', submitHousehold);

const debugNode = document.getElementsByClassName('debug')[0];
//Format debugNode
debugNode.style.display = 'block';
debugNode.style.border = 'none';
/***
 *
 * Generate Household List
 */
const household = {};

function addPersonToHousehold(event) {
    event.preventDefault();
    let formCollection = document.forms[0];
    let ageInput = formCollection.querySelector("input[name='age']").value;
    let relationshipInput = formCollection.querySelector("select[name='rel']").value;
    let isSmoker = formCollection.querySelector("input[name='smoker']").checked;
    if (validateForm(ageInput, relationshipInput)) {
        let personKey = makeNewPerson(ageInput, relationshipInput, isSmoker);
        addPersonToFEList(personKey);
    }
}

function addPersonToFEList(key) {
    let removeButton = createRemoveButton();
    let newPersonDisplay = document.createElement('li');
    newPersonDisplay.id = key;
    newPersonDisplay.textContent = createDisplayText(household[key]);
    newPersonDisplay.insertAdjacentElement('beforeend', removeButton);
    orderListNode.appendChild(newPersonDisplay);
}

/****
 *
 * Submit Household
 */

function submitHousehold() {
    event.preventDefault();
    removeOldJSON();
    let jsonHousehold = JSON.stringify(Object.values(household), null, ' ');
    let jsonSerialNode = document.createElement('div');
    jsonSerialNode.textContent = jsonHousehold;
    debugNode.appendChild(jsonSerialNode);
}

/***
 *
 * Helper Functions
 */

function relationshipIsValid(relationship) {
    if (!relationship.length) {
        return false;
    }
    return true;
}

function ageIsValid(age) {
    age = parseInt(age);
    if (isNaN(age) || age < 1) {
        return false;
    }
    return true;
}

function validateForm(age, relationship) {
    let alerts = '';
    if (!relationshipIsValid(relationship)) {
        alerts += 'Relationship Required\n';
    }
    if (!ageIsValid(age)) {
        alerts += 'Age above 0 is Required\n';
    }

    if (alerts.length) {
        window.alert(alerts);
        return false;
    }
    return true;
}

function Person(age, relationship, isSmoker) {
    this.age = age;
    this.relationship = relationship;
    this.isSmoker = isSmoker;
    this.key = Math.round(1000 * Math.random());
}

function makeNewPerson(ageInput, relationshipInput, isSmoker) {
    let person = new Person(ageInput, relationshipInput, isSmoker);
    while (household[person.key]) {
        new Person(ageInput, relationshipInput, isSmoker);
    }
    household[person.key] = person;
    return person.key;
}

function createDisplayText(person) {
    return JSON.stringify(person);
}

function createRemoveButton() {
    let removeButton = document.createElement('button');
    removeButton.innerHTML = 'X';
    removeButton.onclick = removePerson;
    return removeButton;
}

function removePerson(e) {
    let personKey = e.currentTarget.parentElement.id;
    delete household[personKey];
    e.currentTarget.parentElement.remove();
}

function removeOldJSON() {
    let child = debugNode.lastElementChild;
    if (child) {
        debugNode.removeChild(child);
    }
}
