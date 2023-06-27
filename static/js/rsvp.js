meals = [
    { value: "meat", text: "Braised Short Ribs" },
    { value: "fish", text: "Grilled Swordfish" },
    { value: "vegan", text: "Wild Mushroom Ravioli" },
    { value: "children", text: "Children's Meal" }]

hotels = [
    { value: "omni", text: "Omni Downtown Providence" },
    { value: "residence", text: "Residence Inn Providence Downtown" },
    { value: "other", text: "Other" }]

function addGuests() {
    // Get the parent element to add the row to
    const mealPreferences = document.getElementById("names-meals");
    mealPreferences.innerHTML = ""; // Clear any previous input fields
    mealPreferences.hidden = false;

    // const rowSubtitle = document.createElement("div");
    // const subtitle = document.createElement("h4");
    // subtitle.textContent = "Guests information";
    // rowSubtitle.appendChild(subtitle);
    // mealPreferences.appendChild(document.createElement("hr"));
    // mealPreferences.appendChild(rowSubtitle);


    var guestsSelect = document.getElementById("guests-select");
    var numGuests = guestsSelect.options[guestsSelect.selectedIndex].value;

    for (var i = 0; i < numGuests; i++) {
        //### Create a new row for title ###
        const rowTitle = createRow();
        const title = document.createElement("h3");
        title.textContent = "Guest " + (i + 1);
        title.style.fontVariant = "small-caps";
        title.style.textAlign = "left";
        rowTitle.appendChild(title);
        //####################################################

        //### Create a new row for Name and Age ###
        const rowName = createRow();
        const columnName = createColumn("eight");
        generateGuest(columnName, i)
        const columnAge = createColumn("four")
        generateAge(columnAge, i)
        rowName.appendChild(columnName);
        rowName.appendChild(columnAge);
        //####################################################

        //### Create a new row for Entrée ###
        const rowEntree = createRow();
        const columnMeal = createColumn("six");
        const columnAllergies = createColumn("six");

        rowEntree.setAttribute('id', "row-allergies-" + i);

        generateAllergies(columnAllergies, i);
        generateMeal(columnMeal, i);
        rowEntree.appendChild(columnMeal);
        rowEntree.appendChild(columnAllergies);
        //####################################################

        //### Create a new row for Additional Information subtitle ###
        const rowAdditionalInfo = createRow();
        const subTitle = document.createElement("h4");
        subTitle.textContent = "Additional Information:";
        subTitle.style = "text-align: left; padding-top: 20px;"
        rowAdditionalInfo.appendChild(subTitle);
        //####################################################

        //### Create a new row for welcome dinner radio buttons ###
        const rowWelcome = createRow();
        const colWelcome = createColumn("twelve");
        const welcomeText = "Will you be able to join us for a welcome dinner on Friday?";
        generateRadioButtons(colWelcome, "welcome", welcomeText, i);
        rowWelcome.appendChild(colWelcome);
        //####################################################

        //### Create a new row for bus radio buttons ###
        const rowBus = createRow();
        const colBus = createColumn("twelve");
        const busText = "Would you like to use the bus service from the Omni or Residence Inn hotels on the day of the wedding?";
        generateRadioButtons(colBus, "bus", busText, i);
        rowBus.appendChild(colBus);
        //####################################################

        //### Create a new row for hotel dropdown ###
        const rowHotel = createRow();
        rowHotel.id = "row-hotel-" + i;
        const colHotel = createColumn("six");
        const textHotel = "Where are you staying?";
        generateHotel(colHotel, textHotel, i);
        rowHotel.appendChild(colHotel);
        //####################################################




        const row = document.createElement("div");
        row.classList.add("row");
        const rowAllergies = document.createElement("div");
        rowAllergies.classList.add("row");
        rowAllergies.setAttribute('id', "row-allergies-" + i);
        // row.style = "display: flex; align-items: center;";

        // Create a new columns
        // const column_guest = document.createElement("div");
        // column_guest.classList.add("four", "columns", "c-left");
        // const column_meal = document.createElement("div");
        // column_meal.classList.add("four", "columns", "c-left");
        // const column_age = document.createElement("div");
        // column_age.classList.add("two", "columns", "c-left");
        // const column_allergies = document.createElement("div");
        // column_allergies.classList.add("four", "columns", "c-left");

        // row.appendChild(column_guest);
        // row.appendChild(column_meal);
        // row.appendChild(column_age);
        // rowAllergies.appendChild(column_allergies);

        mealPreferences.appendChild(rowTitle);
        mealPreferences.appendChild(rowName);
        mealPreferences.appendChild(rowName);
        mealPreferences.appendChild(rowEntree);
        mealPreferences.appendChild(rowAdditionalInfo);
        mealPreferences.appendChild(rowWelcome);
        mealPreferences.appendChild(rowBus);
        mealPreferences.appendChild(rowHotel);

        // mealPreferences.appendChild(row);
        // mealPreferences.appendChild(rowAllergies);

        const hrRow = document.createElement('row');
        const firstHr = document.createElement("hr");
        const secondHr = document.createElement("hr");
        const anchor = document.createElement("box-icon");
        anchor.setAttribute('name', 'anchor');
        anchor.setAttribute('color', '#2c3e50');

        hrRow.classList.add("hrRow");
        firstHr.classList.add("hr-line");
        secondHr.classList.add("hr-line");
        anchor.classList.add("anchor-icon");

        hrRow.appendChild(firstHr);
        hrRow.appendChild(anchor);
        hrRow.appendChild(secondHr);
        mealPreferences.appendChild(hrRow);

        // generateGuest(column_guest, i);
        // generateMeal(column_meal, i);
        // generateAge(column_age, i);
        // generateAllergies(column_allergies, i)
    }
}

// RSVP

function generateGuest(column, i) {

    var label = document.createElement("label");
    var input = document.createElement("input");

    label.htmlFor = "guest-name-" + i;
    label.style.textAlign = "left"
    label.innerHTML = "Guest " + (i + 1) + " - Name";

    input.type = "text";
    input.name = "guest-name-" + i;
    input.className = "u-full-width rsvp";
    input.id = "guest-name-" + i;
    input.required = true;


    if (i == 0) {
        var nameFirstGuest = document.getElementById("name");
        var surnameFirstGuest = document.getElementById("surname");
        input.value = nameFirstGuest.value + " " + surnameFirstGuest.value;
        input.readOnly = true;
        input.classList.remove("rsvp");
    } else {
        input.placeholder = "Guest " + (i + 1) + " - name";
    }

    column.appendChild(label);
    column.appendChild(input);
}

function generateMeal(column, i) {
    var label = document.createElement("label");
    var select = document.createElement("select");

    label.htmlFor = "guest-meal-" + i;
    label.style.textAlign = "left"
    label.innerHTML = "Please, choose an entrée for the wedding reception:";

    select.required = true;
    select.className = "u-full-width";
    select.name = "guest-meal-" + i;

    select.placeholder = "Guest " + (i + 1) + " - Meal";

    addOptionsMeal(select);


    column.appendChild(label);
    column.appendChild(select);

}

function addOptionsMeal(select) {
    // Create a new option element with the placeholder text
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.text = "Select an option";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;

    // Add the option element to the beginning of the select element
    select.insertBefore(placeholderOption, select.firstChild);

    this.meals.forEach(element => {
        var mealOption = document.createElement("option");
        mealOption.value = element.value;
        mealOption.text = element.text;
        select.appendChild(mealOption);
    });
}

function generateHotel(column, labelHotel, i) {
    var label = document.createElement("label");
    var select = document.createElement("select");

    label.htmlFor = "hotel-" + i;
    label.style.textAlign = "left"
    label.innerHTML = labelHotel;

    select.required = true;
    select.className = "u-full-width";
    select.name = "hotel-" + i;

    select.placeholder = "Guest " + (i + 1) + " - Hotel";

    addOptionsHotel(select);

    column.appendChild(label);
    column.appendChild(select);

    select.onchange = function () {
        if (select.value === 'other') {
            // console.log("yes, it's other");
            // alert('Please select an option');
            const otherHotel = document.createElement("div");
            const labelOtherHotel = document.createElement("label");
            const inputOtherHotel = document.createElement("input");
            const row = document.getElementById("row-hotel-" + i);
            const columnOtherHotel = createColumn("six");
            columnOtherHotel.id = "column-other-hotel" + i;


            labelOtherHotel.htmlFor = "other-hotel-" + i;
            labelOtherHotel.style.textAlign = "left"
            labelOtherHotel.innerHTML = "If possible, please let us know";

            inputOtherHotel.type = "text";
            inputOtherHotel.name = "other-hotel-" + i;
            inputOtherHotel.className = "u-full-width rsvp";
            inputOtherHotel.id = "other-hotel-" + i;
            inputOtherHotel.placeholder = "Where are you staying?";

            otherHotel.appendChild(labelOtherHotel);
            otherHotel.appendChild(inputOtherHotel);

            columnOtherHotel.appendChild(otherHotel);

            row.appendChild(columnOtherHotel);

        } else {
            const columnOtherHotel = document.getElementById("column-other-hotel" + i);
            columnOtherHotel.remove();

        }

    }
}

function addOptionsHotel(select) {
    // Create a new option element with the placeholder text
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.text = "Select an option";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;

    // Add the option element to the beginning of the select element
    select.insertBefore(placeholderOption, select.firstChild);

    this.hotels.forEach(element => {
        var hotelOption = document.createElement("option");
        hotelOption.value = element.value;
        hotelOption.text = element.text;
        select.appendChild(hotelOption);
    });
}

function generateAge(column, i) {
    var label = document.createElement("label");
    var ageCheckbox = document.createElement("input");
    var span = document.createElement("span");
    var placeHolder = document.createElement("label")

    ageCheckbox.type = "checkbox";
    ageCheckbox.name = "guest-u21-" + i;
    span.classList.add("label-body");
    span.innerHTML = "Under 21?";
    placeHolder.id = "checkbox-placeholder";
    placeHolder.innerHTML = "&nbsp;"
    // placeHolder.style = "height: 20px; position: relative; top: -10px; margin-bottom: 15px";

    label.classList.add("labelCheckbox");

    label.appendChild(ageCheckbox);
    label.appendChild(span);

    column.appendChild(placeHolder);
    column.appendChild(label);
}

function generateAllergies(column, i) {
    var label = document.createElement("label");
    var allergiesCheckbox = document.createElement("input");
    var span = document.createElement("span");
    // var placeHolder = document.createElement("label")

    allergiesCheckbox.type = "checkbox";
    allergiesCheckbox.name = "guest-allergies-" + i;
    allergiesCheckbox.id = "guest-allergies-" + i;

    span.classList.add("label-body");
    span.innerHTML = "Food allergies?";
    // placeHolder.id = "checkbox-placeholder";
    // placeHolder.innerHTML = "&nbsp;"
    // placeHolder.style = "height: 20px; position: relative; top: -10px; margin-bottom: 15px";

    label.classList.add("labelCheckbox");

    label.appendChild(allergiesCheckbox);
    label.appendChild(span);

    // column.appendChild(placeHolder);
    column.appendChild(label);

    allergiesCheckbox.onchange = function () {
        // code to be executed when the checkbox is checked or unchecked
        if (allergiesCheckbox.checked) {

            var input = document.createElement("input");

            input.type = "text";
            input.name = "guest-comment-" + i;
            input.className = "u-full-width rsvp";
            input.id = "guest-comment-" + i;
            input.placeholder = "Please specify food allergies, intolerances, etc."

            column.appendChild(input)
        } else {
            const input = document.getElementById("guest-comment-" + i);
            input.remove();
        }
    }
}

function generateRadioButtons(column, name, textLabel, i) {
    var label = document.createElement("label");
    label.htmlFor = name;
    label.innerHTML = textLabel;
    var radiobuttons = document.createElement("div");
    radiobuttons.classList.add("radio-buttons");

    const labelYes = document.createElement("label");
    labelYes.style.padding = "10px";
    const labelNo = document.createElement("label");
    labelNo.classList.add("inline");

    const spanYes = document.createElement("span");
    const spanNo = document.createElement("span");
    const inputYes = document.createElement("input");
    const inputNo = document.createElement("input");
    inputYes.type = "radio";
    inputYes.name = name + "-" + i;
    inputYes.value = "yes";
    inputYes.checked = true;
    inputNo.type = "radio";
    inputNo.name = name + "-" + i;
    inputNo.value = "no";
    inputNo.checked = false;
    spanYes.classList.add("label-body");
    spanYes.innerHTML = "Yes";
    spanNo.classList.add("label-body");
    spanNo.innerHTML = "No";

    labelYes.appendChild(inputYes);
    labelYes.appendChild(spanYes);
    labelNo.appendChild(inputNo);
    labelNo.appendChild(spanNo);

    radiobuttons.appendChild(labelYes);
    radiobuttons.appendChild(labelNo);

    column.appendChild(label);
    column.appendChild(radiobuttons);
}

function toggleSelectGuests() {
    var radioNo = document.querySelector('input[name="attending"][value="no"]');
    var select = document.getElementById("guests-select");
    var guestsNamesDiv = document.getElementById("guests-names");
    var guestsMealsDiv = document.getElementById("guests-meals");
    var mealPreferences = document.getElementById("names-meals");

    guestsMealsDiv.innerHTML = "";
    guestsNamesDiv.innerHTML = "";
    mealPreferences.innerHTML = "";

    select.disabled = (radioNo.checked) ? true : false;
    select.value = (radioNo.checked) ? 0 : ''

    mealPreferences.hidden = true;
}

function resetForm(params) {
    var guestsNamesDiv = document.getElementById("guests-names");
    var guestsMealsDiv = document.getElementById("guests-meals");
    var mealPreferences = document.getElementById("names-meals");
    guestsNamesDiv.innerHTML = "";
    guestsMealsDiv.innerHTML = "";
    mealPreferences.innerHTML = "";
    document.getElementById(params).reset();
    document.getElementById("guests-select").disabled = false;

    mealPreferences.hidden = true;
}


window.addEventListener('load', function () {
    const firstInfo = document.getElementById("first-info");
    const nombre = document.getElementById("name");
    const apellido = document.getElementById("surname");

    nombre.addEventListener("input", function () {
        const guestNameZero = document.getElementById("guest-name-0");
        if (guestNameZero) {
            guestNameZero.value = nombre.value + " " + apellido.value;
        }
    });
    apellido.addEventListener("input", function () {
        const guestNameZero = document.getElementById("guest-name-0");
        if (guestNameZero) {
            guestNameZero.value = nombre.value + " " + apellido.value;
        }
    });
});


function createRow() {
    const row = document.createElement('div');
    row.classList.add("row");
    return row;
}


function createColumn(n) {
    const column = document.createElement("div");
    column.classList.add(n, "columns", "c-left");
    return column
}

/* Handle errors or missing fields*/

// var guestsSelect = document.getElementById("guests-select")
// var nGuests = guestsSelect.options[guestsSelect.selectedIndex].value;

// guestsSelect.addEventListener('submit', function (event) {
//     if (nGuests.value === '') {
//         event.preventDefault();
//         alert('Please indicate number of guests');
//     }
// });

// var checkbox = document.getElementById('guest-allergies-0');
// checkbox.onchange = function() {
//   // code to be executed when the checkbox is checked or unchecked
//   console.log("clicked!")
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const form = document.querySelector('#formRSVP');
//     form.addEventListener('submit', async (event) => {
//         event.preventDefault(); // Prevent default form submission behavior

//         const formData = new FormData(form); // Get form data
//         const json = JSON.stringify(Object.fromEntries(formData)); // Convert form data to JSON

//         const response = await fetch(form.action, { // Send POST request
//             method: form.method,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: json
//         });

//         const data = await response.json(); // Parse response JSON
//         console.log(data); // Log response data to console
//     });
// });