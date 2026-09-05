// ================= VIDEO DATA =================

const edits = [
    {
        type: "video",
        title: "01 - Lucy",
        description:
            "Made my own character, practice on animation/keyframing, and typography.",
        app: ["Adobe After Effects", "Adobe Illustrator"],
        source: "/resources/mm-projects/animation.mp4",
    },

    {
        type: "video",
        title: "02 - Introduction",
        description:
            "A short-form edit experimenting with transitions, velocity, and beat synchronization. This also includes 3D texts.",
        app: ["Adobe After Effects", "Adobe Premiere Pro"],
        source: "/resources/mm-projects/introduction.mp4",
    },

    {
        type: "video",
        title: "03 - Butterfly",
        description:
            "A personal edit that plays with velocity, to keep up with the \"TikTok Velocity Edits\" trends.",
        app: ["Adobe After Effects", "Adobe Premiere Pro"],
        source: "/resources/mm-projects/butterfly.mp4",
    },

    {
        type: "youtube",
        title: "04 - A Day in My Life",
        description:
            "A personal edit that plays with velocity, to keep up with the \"TikTok Velocity Edits\" trends.",
        app: ["Adobe After Effects", "Adobe Premiere Pro"],
        source: "https://youtu.be/mFK53CUQarI",
    },
];

// ================= CREATE VIDEO CARD =================

function createMedia(edit) {

    if (edit.type === "youtube") {
        const videoId = new URL(edit.source).searchParams.get("v");

        return `
            <div class="card-media video-media">
                <iframe
                    src="https://www.youtube.com/embed/${videoId}"
                    title="${edit.title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>
            </div>
        `;
    }


    if (edit.type === "video") {
        return `
            <div class="card-media video-media">
                <video
                    src="${edit.source}"
                    controls
                    controlsList="nodownload"
                    playsinline
                    preload="metadata">
                </video>
            </div>
        `;
    }


    if (edit.type === "link") {
        return `
            <a
                class="card-media link-media"
                href="${edit.source}"
                target="_blank"
                rel="noopener noreferrer">

                <span class="link-icon">↗</span>
                <span>View this work</span>

            </a>
        `;
    }


    return "";
}

function createVideoCard(edit, index) {

    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
        ${createMedia(edit)}

        <div class="card-body">

            <div class="card-meta">
                <span class="num">
                    Edit. ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="cat">
                    Personal Edit
                </span>
            </div>

            <h3>${edit.title}</h3>

            <p class="desc">
                ${edit.description}
            </p>

            <div class="tag-row">
                ${edit.app
                    .map(app => `<span>${app}</span>`)
                    .join("")}
            </div>

        </div>
    `;

    return card;
}

// ================= LOAD VIDEOS =================

function loadVideos() {

    const worksGrid = document.getElementById("worksGrid");

    if (!worksGrid) return;

    edits.forEach((edit, index) => {
        const card = createVideoCard(edit, index);
        worksGrid.appendChild(card);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    loadVideos();
});

// ================= INITIALIZE =================

document.addEventListener("contextmenu", event => {
  if (event.target.tagName === "VIDEO") {
    event.preventDefault();
  }
});