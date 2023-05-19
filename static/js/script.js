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


window.addEventListener('load', function () {
    const header = document.getElementById('main-header');
    const styles = window.getComputedStyle(header);
    const original = styles.getPropertyValue('height');
    header.style.height = original;
});

window.onload = function () {
    var header = document.getElementById('main-header');
    var styles = window.getComputedStyle(header);
    var altura = styles.getPropertyValue('height');
    window.addEventListener("scroll", function () {
        var smallHeader = document.getElementById("small-header");
        if (window.pageYOffset > parseFloat(altura)) {
            header.style.height = "0px";
            // header.style.display = "none";
            smallHeader.style.display = "inline-flex";
            smallHeader.style.justifyContent = "space-around";

        } else {
            header.style.height = altura;
            // header.style.display = "block";
            smallHeader.style.display = "none";
        }
    });
}


// JavaScript code for tab switching
function handleTabClick(e) {
    e.preventDefault();
    var target = e.target.getAttribute('href');

    // Remove active class from all tabs and tab contents
    var tabLinks = document.querySelectorAll('.hotel-tabs a');
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('active');
    }

    var tabContents = document.querySelectorAll('.tab-content');
    for (var j = 0; j < tabContents.length; j++) {
        tabContents[j].classList.remove('active');
    }

    // Add active class to the clicked tab and corresponding tab content
    e.target.classList.add('active');
    document.querySelector(target).classList.add('active');
}

// Attach event listeners to tab links
document.addEventListener('DOMContentLoaded', function () {
    var tabLinks = document.querySelectorAll('.hotel-tabs a');
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].addEventListener('click', handleTabClick);
    }

    // Hide all tab contents initially
    var tabContents = document.querySelectorAll('.tab-content');
    for (var j = 0; j < tabContents.length; j++) {
        tabContents[j].classList.remove('active');
    }
});
