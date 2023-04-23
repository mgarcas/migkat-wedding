function addGuests() {
    // Get the parent element to add the row to
    const mealPreferences = document.getElementById("names-meals");
    mealPreferences.hidden = false;
    // Create a new row
    // const row = document.createElement("div");
    // row.classList.add("row");

    // const subtitle = document.createElement("h5")
    // subtitle.textContent = "Meal preferences"
    // row.appendChild(subtitle)

    // Create a new column
    // const column = document.createElement("div");
    // column.classList.add(["five","columns", "rsvp"]);

    // Add the column to the row
    // row.appendChild(column);



    // Add the row to the parent element
    // parentElement.appendChild(row);

    var guestsSelect = document.getElementById("guests-select");
    var numGuests = guestsSelect.options[guestsSelect.selectedIndex].value;

    addGuestInputs(numGuests);
    addMealSelect(numGuests)
}

// RSVP

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



function toggleSelectGuests() {
    var radioNo = document.querySelector('input[name="attending"][value="no"]');
    var select = document.getElementById("guests-select");
    var guestsNamesDiv = document.getElementById("guests-names");
    var guestsMealsDiv = document.getElementById("guests-meals");

    guestsMealsDiv.innerHTML = "";
    guestsNamesDiv.innerHTML = "";

    select.disabled = (radioNo.checked) ? true : false;
    select.value = (radioNo.checked) ? 0 : ''
    // if (radioNo.checked) {
    //     while (guestsNamesDiv.firstChild) {
    //         guestsNamesDiv.removeChild(guestsNamesDiv.firstChild);
    //     }
    // }
}

function resetForm(params) {
    var guestsNamesDiv = document.getElementById("guests-names");
    var guestsMealsDiv = document.getElementById("guests-meals");
    guestsNamesDiv.innerHTML = "";
    guestsMealsDiv.innerHTML = "";
    document.getElementById(params).reset();
    document.getElementById("guests-select").disabled = false;
}


window.addEventListener('load', function () {
    const nombre = document.getElementById("name");
    const apellido = document.getElementById("surname");

    nombre.addEventListener("input", function () {
        const guestNameZero = document.getElementById("guest-name-0");
        if (guestNameZero) {
            guestNameZero.value = nombre.value;
        }
    });
});
