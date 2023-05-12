meals = [
    { value: "meat", text: "Meat" },
    { value: "fish", text: "Sword Fish" },
    { value: "vegan", text: "Vegan Option" },
    { value: "children", text: "Child Menu" }]

function addGuests() {
    // Get the parent element to add the row to
    const mealPreferences = document.getElementById("names-meals");
    mealPreferences.innerHTML = ""; // Clear any previous input fields
    mealPreferences.hidden = false;

    const rowSubtitle = document.createElement("div");
    const subtitle = document.createElement("h4");
    subtitle.textContent = "Meal preferences";
    rowSubtitle.appendChild(subtitle);
    mealPreferences.appendChild(rowSubtitle);

    var guestsSelect = document.getElementById("guests-select");
    var numGuests = guestsSelect.options[guestsSelect.selectedIndex].value;

    for (var i = 0; i < numGuests; i++) {
        // Create a new row
        const row = document.createElement("div");
        row.classList.add("row");
        const rowAllergies = document.createElement("div");
        rowAllergies.classList.add("row");
        rowAllergies.setAttribute('id', "row-allergies-" + i);
        // row.style = "display: flex; align-items: center;";

        // Create a new columns
        const column_guest = document.createElement("div");
        column_guest.classList.add("four", "columns", "c-left");
        const column_meal = document.createElement("div");
        column_meal.classList.add("four", "columns", "c-left");
        const column_age = document.createElement("div");
        column_age.classList.add("two", "columns", "c-left");
        const column_allergies = document.createElement("div");
        column_allergies.classList.add("three", "columns", "c-left");

        row.appendChild(column_guest);
        row.appendChild(column_meal);
        row.appendChild(column_age);
        rowAllergies.appendChild(column_allergies);
        mealPreferences.appendChild(row);
        mealPreferences.appendChild(rowAllergies);
        mealPreferences.appendChild(document.createElement("hr"));

        generateGuest(column_guest, i);
        generateMeal(column_meal, i);
        generateAge(column_age, i);
        generateAllergies(column_allergies, i)
    }
}

// RSVP

function generateGuest(column, i) {

    var label = document.createElement("label");
    var input = document.createElement("input");

    label.htmlFor = "guest-name-" + i;
    label.style.textAlign = "left"
    label.innerHTML = "Guest #" + (i + 1) + " Name";

    input.type = "text";
    input.name = "guest-name-" + i;
    input.className = "u-full-width rsvp";
    input.id = "guest-name-" + i;


    if (i == 0) {
        var nameFirstGuest = document.getElementById("name");
        var surnameFirstGuest = document.getElementById("surname");
        input.value = nameFirstGuest.value + " " + surnameFirstGuest.value;
        // input.disabled = true;
        input.readOnly = true;
        input.classList.remove("rsvp");
    } else {
        input.placeholder = "Guest #" + (i + 1) + " name";
    }

    column.appendChild(label);
    column.appendChild(input);
}

function generateMeal(column, i) {
    var label = document.createElement("label");
    var select = document.createElement("select");

    label.htmlFor = "guest-meal-" + i;
    label.style.textAlign = "left"
    label.innerHTML = "Guest #" + (i + 1) + " Meal Choice";

    select.className = "u-full-width";
    select.name = "guest-meal-" + i;

    select.placeholder = "Guest #" + (i + 1) + " Meal";

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

    label.classList.add = "c-left";

    label.appendChild(ageCheckbox);
    label.appendChild(span);

    column.appendChild(placeHolder);
    column.appendChild(label);
}

function generateAllergies(column, i) {
    var label = document.createElement("label");
    var allergiesCheckbox = document.createElement("input");
    var span = document.createElement("span");
    var placeHolder = document.createElement("label")

    allergiesCheckbox.type = "checkbox";
    allergiesCheckbox.name = "guest-allergies-" + i;
    allergiesCheckbox.id = "guest-allergies-" + i;

    span.classList.add("label-body");
    span.innerHTML = "Food allergies?";
    placeHolder.id = "checkbox-placeholder";
    placeHolder.innerHTML = "&nbsp;"
    // placeHolder.style = "height: 20px; position: relative; top: -10px; margin-bottom: 15px";

    label.classList.add = "c-left";

    label.appendChild(allergiesCheckbox);
    label.appendChild(span);

    column.appendChild(placeHolder);
    column.appendChild(label);

    allergiesCheckbox.onchange = function () {
        // code to be executed when the checkbox is checked or unchecked
        if (allergiesCheckbox.checked) {

            console.log("clicked! number " + i)
            const row = document.getElementById("row-allergies-" + i);
            const column = document.createElement("div");
            column.setAttribute("id","col-" + i)
            column.classList.add("six", "columns", "c-left");

            var label = document.createElement("label");
            var input = document.createElement("input");

            label.htmlFor = "guest-comment-" + i;
            label.style.textAlign = "left"
            label.innerHTML = "Guest #" + (i + 1) + " comment";

            input.type = "text";
            input.name = "guest-comment-" + i;
            input.className = "u-full-width rsvp";
            input.id = "guest-comment-" + i;
            input.placeholder = "Please specify food allergies"

            column.appendChild(label)
            column.appendChild(input)
            row.appendChild(column)
        } else {
            const col = document.getElementById("col-" + i);
            col.remove();
        }
    }
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