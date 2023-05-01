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
        // row.style = "display: flex; align-items: center;";

        // Create a new columns
        const column_guest = document.createElement("div");
        column_guest.classList.add("four", "columns", "c-left");
        const column_meal = document.createElement("div");
        column_meal.classList.add("four", "columns", "c-left");
        const column_age = document.createElement("div");
        column_age.classList.add("three", "columns", "c-left");

        row.appendChild(column_guest);
        row.appendChild(column_meal);
        row.appendChild(column_age);
        mealPreferences.appendChild(row);
        mealPreferences.appendChild(document.createElement("hr"));

        generateGuest(column_guest, i);
        generateMeal(column_meal, i);
        generateAge(column_age, i);
    }
}

// RSVP

function generateGuest(column, i) {

    var label = document.createElement("label");
    var input = document.createElement("input");

    label.htmlFor = "guest-name-" + i;
    label.style.textAlign = "left"
    label.innerHTML = "Guest #" + (i + 1) + " name";

    input.type = "text";
    input.name = "guest-name-" + i;
    input.className = "u-full-width rsvp";
    input.id = "guest-name-" + i;


    if (i == 0) {
        var nameFirstGuest = document.getElementById("name");
        var surnameFirstGuest = document.getElementById("surname");
        input.value = nameFirstGuest.value + " " + surnameFirstGuest.value;
        input.disabled = true;
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









// old and unused code

function addGuestInputs(numGuests) {

    var guestsNamesDiv = document.getElementById("guests-names");
    var nameFirstGuest = document.getElementById("name");
    guestsNamesDiv.innerHTML = ""; // Clear any previous input fields

    for (var i = 0; i < numGuests; i++) {
        var label = document.createElement("label");
        var input = document.createElement("input");

        label.htmlFor = "guest-name-" + i;
        label.innerHTML = "Guest #" + (i + 1) + " name";

        input.type = "text";
        input.name = "guest-name-" + i;
        input.className = "u-full-width rsvp";
        input.id = "guest-name-" + i;


        if (i == 0) {
            input.value = nameFirstGuest.value;
            input.disabled = true;
        } else {
            input.placeholder = "Guest #" + (i + 1) + " name";
        }

        guestsNamesDiv.appendChild(label);
        guestsNamesDiv.appendChild(input);
    }
}

function addMealSelect(numGuests) {
    var guestsMealsDiv = document.getElementById("guests-meals");
    guestsMealsDiv.innerHTML = ""; // Clear any previous input fields

    for (var i = 0; i < numGuests; i++) {
        var label = document.createElement("label");
        var select = document.createElement("select");

        label.htmlFor = "guest-meal-" + i;
        label.innerHTML = "Guest #" + (i + 1) + " Meal Choice";

        // input.type = "text";
        // input.name = "guest-name-" + i;
        select.className = "u-full-width rsvp";
        // input.id = "guest-name-" + i;


        // if (i == 0) {
        //     input.value = nameFirstGuest.value;
        //     input.disabled = true;
        // } else {
        select.placeholder = "Guest #" + (i + 1) + " Meal";
        // }

        guestsMealsDiv.appendChild(label);
        guestsMealsDiv.appendChild(select);
    }

}