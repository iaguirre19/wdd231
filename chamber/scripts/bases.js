function setDates() {
    const yearSpot = document.getElementById("copyright");
    const modSpot = document.getElementById("lastModification");

    if (yearSpot) {
        const now = new Date();
        yearSpot.textContent =
            "© " + now.getFullYear() + " WDD231 | Iran Aguirre";
    }

    if (modSpot) {
        modSpot.textContent = "Last modified: " + document.lastModified;
    }
}

export { setDates };
