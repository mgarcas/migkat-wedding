window.addEventListener('load', function () {
    var modal = document.getElementById("contact-modal");
    var btn = document.getElementsByClassName("modal-btn")[0];
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.addEventListener('click', function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });

});
