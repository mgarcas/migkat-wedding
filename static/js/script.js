
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
