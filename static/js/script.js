window.addEventListener("load", function () {
    var liActive = document.querySelector("#menu li");
    if (liActive.classList.contains("active")) {
        liActive.classList.remove("active");
    }

    document.querySelector("#menu > li > a").addEventListener("click", function (e) {
        e.preventDefault();
        var submenu = this.parentNode.querySelector("ul");
        submenu.classList.toggle("active");
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const panels = document.querySelectorAll(".panel");

    panels.forEach((panel) => {
        panel.addEventListener("click", () => {
            if (panel.classList.contains("active")) {
                panel.classList.remove("active");
            } else {
                panels.forEach((panel) => {
                    panel.classList.remove("active");
                });
                panel.classList.add("active");
            }
        });
    });

});
