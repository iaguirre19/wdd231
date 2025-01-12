const menuIcon = document.getElementById("menu");
const nav = document.querySelector("nav");
const navLinks = document.getElementById("navLinks");

if (!document.getElementById("closeMenu")) {
    const closeButton = document.createElement("i");
    closeButton.id = "closeMenu";
    closeButton.classList.add("fas", "fa-times");
    nav.appendChild(closeButton);

    closeButton.addEventListener("click", () => {
        nav.classList.remove("active");
        navLinks.classList.remove("active");
    });
}

menuIcon.addEventListener("click", () => {
    nav.classList.add("active");
    navLinks.classList.add("active");
});

navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
        nav.classList.remove("active");
        navLinks.classList.remove("active");
    }
});
