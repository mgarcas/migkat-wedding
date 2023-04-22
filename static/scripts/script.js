function addGuestInputs() {
    var guestsSelect = document.getElementById("guests-select");
    var numGuests = guestsSelect.options[guestsSelect.selectedIndex].value;
    var guestsNamesDiv = document.getElementById("guests-names");
    var nameFirstGuest = document.getElementById("name").value;
    guestsNamesDiv.innerHTML = ""; // Clear any previous input fields

    for (var i = 0; i < numGuests; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.name = "guest-name-" + i;
        input.className = "u-full-width rsvp"
        if (i == 0) {
            input.value = nameFirstGuest;
        } else {
            input.placeholder = "Guest #" + (i + 1) + " name";
        }
        guestsNamesDiv.appendChild(input);
    }
}

function toggleSelectGuests() {
    var radioNo = document.querySelector('input[name="attending"][value="no"]');
    var select = document.getElementById("guests-select");
    var guestsNamesDiv = document.getElementById("guests-names");

    select.disabled = (radioNo.checked) ? true : false;
    select.value = (radioNo.checked) ? 0 : ''
    if (radioNo.checked) {
        while (guestsNamesDiv.firstChild) {
            guestsNamesDiv.removeChild(guestsNamesDiv.firstChild);
        }
    }
}

function resetForm(params) {
    document.getElementById(params).reset();
    document.getElementById("guests-select").disabled = false;
}


const input1 = document.getElementById("name");
const input2 = document.getElementById("guest-name-0");

input1.addEventListener("input", function () {
    input2.value = input1.value;
});
