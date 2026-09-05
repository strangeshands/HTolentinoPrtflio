// ================= PORTFOLIO DATA =================

const devProjects = [
    {
        title: "JJ Apartments Property Management System",
        image: "/resources/dev-images/connectify-image.png",
        description:
            "Extended an existing property management platform for a real-estate client as part of a 7-person team, building frontend features in Next.js within a Kanban and CI/CD workflow.",
        tags: ["Next.js", "GitHub Actions", "Client project"],
        link: "#",
    },

    {
        title: "Unbound Case Management System",
        image: "/resources/dev-images/connectify-image.png",
        description:
            "Built backend features for a case-management system for real client Unbound, including data models and API endpoints for case records, using Agile sprint cycles.",
        tags: ["Express", "MongoDB", "Client project"],
        link: "#",
    },

    {
        title: "RSVP Invitation Website",
        image: "/resources/dev-images/rsvp-image.png",
        description:
            "Independently designed and built a full-stack digital invitation platform with group-code-based guest lookup, from database schema to interface. This is deployed on Render.",
        tags: ["MongoDB", "Mongoose", "Solo project"],
        link: "https://leaat50-rsvp.onrender.com/rsvp/LizaFriend",
    },

    {
        title: "Connectify — Forum Web App",
        image: "/resources/dev-images/connectify-image.png",
        description:
            "A Twitter-style forum web application built and deployed as a major course requirement, covering both backend and frontend development.",
        tags: ["MongoDB", "Handlebars", "Coursework"],
        link: "https://github.com/strangeshands/APDEV-MCO",
    },
];

const mmProjects = [
    {
        title: "Academic Courseworks",
        description:
            "Recurring video editor and graphic designer for coursework throughout my academic journey — motion graphics, transitions, and visual effects for presentations and project outputs.",
        tags: ["Premiere Pro", "After Effects", "2019–Present"],
        link: "portf-academic_edits.html",
    },

    {
        title: "Early Edits — Personal Fanpage",
        description:
            "Where it started: creating and publishing edits since age 13, building pacing, music sync, and visual-effects instincts through consistent personal practice.",
        tags: ["Since 2020", "Self-directed"],
        link: "portf-personal_edits.html",
    },
];

// ================= LOAD HTML TEMPLATES =================

async function loadPortfolioTemplates() {
    const [devResponse, mmResponse] = await Promise.all([
        fetch("/templates/card-dev.html"),
        fetch("/templates/card-mm.html"),
    ]);

    const devHTML = await devResponse.text();
    const mmHTML = await mmResponse.text();

    const parser = new DOMParser();

    const devDoc = parser.parseFromString(devHTML, "text/html");
    const mmDoc = parser.parseFromString(mmHTML, "text/html");

    const devTemplate = devDoc.querySelector("#dev-card-template");
    const mmTemplate = mmDoc.querySelector("#mm-card-template");

    return {
        devTemplate,
        mmTemplate,
    };
}

// ================= CREATE CARD =================

function createCard(template, project, category, number) {
    const card = template.content.cloneNode(true);

    const article = card.querySelector(".card");

    article.dataset.cat = category;

    // Number
    card.querySelector(".num").textContent =
        `${category === "dev" ? "Dev" : "MM"}. ${String(number).padStart(2, "0")}`;

    // Title
    card.querySelector("h3").textContent = project.title;

    // Description
    card.querySelector(".desc").textContent = project.description;

    // Image
    const image = card.querySelector(".card-img");

    if (image) {
        if (project.image) {
            image.src = project.image;
            image.alt = project.title;
        }
    }

    // Tags
    const tagRow = card.querySelector(".tag-row");

    project.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tagRow.appendChild(tagElement);
    });

    // Link
    const link = card.querySelector(".card-link");

    link.href = project.link;

    return card;
}

// ================= RENDER PROJECTS =================

async function renderProjects() {
    const worksGrid = document.getElementById("worksGrid");

    if (!worksGrid) return;

    const templates = await loadPortfolioTemplates();

    // Development projects
    devProjects.forEach((project, index) => {
        const card = createCard(
            templates.devTemplate,
            project,
            "dev",
            index + 1,
        );

        worksGrid.appendChild(card);
    });

    // Multimedia projects
    mmProjects.forEach((project, index) => {
        const card = createCard(templates.mmTemplate, project, "mm", index + 1);

        worksGrid.appendChild(card);
    });
}

// ================= FILTER =================

function setupFilters() {
    const filterPills = document.getElementById("filterPills");

    if (!filterPills) return;

    // by default
    const dev_button = document.getElementById("dev_button");
    dev_button.classList.add("active");

    document.querySelectorAll("#worksGrid .card").forEach((card) => {
        if (card.dataset.cat === "dev") {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    filterPills.addEventListener("click", (event) => {
        const button = event.target.closest(".pill");

        if (!button) return;

        const filter = button.dataset.filter;

        // Update active button
        document.querySelectorAll(".pill").forEach((pill) => {
            pill.classList.remove("active");
        });

        button.classList.add("active");

        // Filter cards
        document.querySelectorAll("#worksGrid .card").forEach((card) => {
            if (filter === "all" || card.dataset.cat === filter) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// ================= INITIALIZE =================

document.addEventListener("DOMContentLoaded", async () => {
    await renderProjects();
    setupFilters();
});
