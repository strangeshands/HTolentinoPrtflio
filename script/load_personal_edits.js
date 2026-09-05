// ================= VIDEO DATA =================

const edits = [
    {
        title: "01 - About You",
        description: "Practice on typography and lyrics animation.",
        app: "Adobe After Effects",
        video: "/resources/mm-projects/about%20you.mp4",
    },

    {
        title: "02 - Strange",
        description:
            "A short-form edit experimenting with transitions, velocity, and beat synchronization. This also includes 3D texts.",
        app: "Adobe After Effects",
        video: "/resources/mm-projects/ds_smfd_wm.mp4",
    },

    {
        title: "03 - Flame On!",
        description:
            "A personal edit that plays with velocity, to keep up with the \"Tiktok Velocity Edits\" trends.",
        app: "After Effects",
        video: "/resources/mm-projects/johnny.mp4",
    },

    {
        title: "04 - Robin",
        description:
            "A short-form edit experimenting with transitions, different built-in effects on AE, and Sapphire Plug-in.",
        app: "After Effects",
        video: "/resources/mm-projects/robin_iwnt_wm.mp4",
    },
];

// ================= CREATE VIDEO CARD =================

function createVideoCard(edit, index) {
    const card = document.createElement("article");

    card.className = "card";

    card.innerHTML = `
    <div class="card-media">
      <video
  src="${edit.video}"
  controls
  controlsList="nodownload"
  disablePictureInPicture
  playsinline
></video>
    </div>

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
        <span>${edit.app}</span>
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

// ================= INITIALIZE =================

document.addEventListener("DOMContentLoaded", () => {
    loadVideos();
});

document.addEventListener("contextmenu", event => {
  if (event.target.tagName === "VIDEO") {
    event.preventDefault();
  }
});