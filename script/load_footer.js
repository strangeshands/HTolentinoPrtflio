document.addEventListener("DOMContentLoaded", async () => {
    const footer = document.getElementById("footer");

    if (!footer) return;

    try {
        const response = await fetch("/templates/footer.html");

        if (!response.ok) {
            throw new Error("Could not load footer.html");
        }

        const html = await response.text();

        footer.innerHTML = html;

    } catch (error) {
        console.error("Error loading footer:", error);
    }
});