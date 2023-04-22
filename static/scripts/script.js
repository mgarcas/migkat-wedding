function addGuestInputs() {
    var guestsSelect = document.getElementById("guests-select");
    var numGuests = guestsSelect.options[guestsSelect.selectedIndex].value;
    var guestsNamesDiv = document.getElementById("guests-names");
    guestsNamesDiv.innerHTML = ""; // Clear any previous input fields

    for (var i = 0; i < numGuests; i++) {
        var input = document.createElement("input");
        input.type = "text";
        input.name = "guest-name-" + i;
        input.className = "u-full-width rsvp"
        input.placeholder = "Guest #" + (i + 1) + " name";
        guestsNamesDiv.appendChild(input);
    }
}
