window.addEventListener('load', function () {
    var modalMenu = document.getElementById("modal-menu");
    var btnMenu = document.getElementsByClassName("modal-btn-menu")[0];
    var spanMenu = document.getElementsByClassName("close-menu")[0];

    btnMenu.onclick = function () {
        modalMenu.style.display = "block";
    }

    spanMenu.onclick = function () {
        modalMenu.style.display = "none";
    }

    window.addEventListener('click', function (event) {
        if (event.target == modalMenu) {
          modalMenu.style.display = "none";
        }
      });
});
