const gridButton = document.getElementById("grid");
const listButton = document.getElementById("list");
const cardsContainer = document.getElementById("cardsContainer");

let businessesCache = [];
let currentView = "grid";

const membershipNames = {
    1: "Bronze",
    2: "Silver",
    3: "Gold",
};

function setActiveView(mode) {
    currentView = mode;
    gridButton.classList.toggle("active", mode === "grid");
    listButton.classList.toggle("active", mode === "list");
    gridButton.setAttribute("aria-pressed", mode === "grid");
    listButton.setAttribute("aria-pressed", mode === "list");
    cardsContainer.classList.toggle("view-grid", mode === "grid");
    cardsContainer.classList.toggle("view-list", mode === "list");
    renderBusinesses();
}

function buildCard(business, index) {
    const card = document.createElement("article");
    card.className = `business-card ${currentView === "list" ? "is-list" : ""}`;

    const membershipLevel = membershipNames[business.membershipLevel] || "Member";

    card.innerHTML = `
        <div class="card-top">
            <h3>${business.name}</h3>
            <span class="membership-pill">${membershipLevel}</span>
        </div>
        <p class="industry">${business?.otherInformation?.industry || "Member business"}</p>
        <div class="card-body">
            <p class="info-line">
                <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
                <span>${business.address}</span>
            </p>
            <p class="info-line">
                <i class="fa-solid fa-phone" aria-hidden="true"></i>
                <span>${business.phone}</span>
            </p>
            <p class="info-line">
                <i class="fa-solid fa-globe" aria-hidden="true"></i>
                <a href="${business.website}" target="_blank" rel="noopener">${business.website}</a>
            </p>
        </div>
        <div class="card-footer">
            <div class="hours">
                <i class="fa-regular fa-clock" aria-hidden="true"></i>
                <span>${business?.otherInformation?.businessHours || "Hours not available"}</span>
            </div>
            <a class="cta-link" href="${business.website}" target="_blank" rel="noopener">
                Visit site <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
            </a>
        </div>
    `;

    return card;
}

function renderBusinesses() {
    cardsContainer.innerHTML = "";
    businessesCache.forEach((business, index) => {
        const card = buildCard(business, index);
        cardsContainer.appendChild(card);
    });
}

async function fetchBusinesses() {
    try {
        const response = await fetch("/chamber/data/members.json");
        const data = await response.json();
        businessesCache = data.businesses || [];
        setActiveView(currentView);
    } catch (error) {
        console.error("Error fetching business data:", error);
    }
}

if (gridButton && listButton && cardsContainer) {
    gridButton.addEventListener("click", () => setActiveView("grid"));
    listButton.addEventListener("click", () => setActiveView("list"));
    fetchBusinesses();
}
