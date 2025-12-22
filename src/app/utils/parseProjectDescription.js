// utils/parseProjectDescription.js
export default function parseProjectDescription(html = "") {
    if (!html) return [];

    const doc = new DOMParser().parseFromString(html, "text/html");
    const body = doc.body;

    const sections = [];
    let currentSection = null;

    [...body.children].forEach((node) => {
        if (node.tagName === "H3") {
            currentSection = {
                title: node.textContent?.trim() || "",
                content: [],
            };
            sections.push(currentSection);
        } else {
            if (!currentSection) {
                currentSection = {
                    title: "Project Detail",
                    content: [],
                };
                sections.push(currentSection);
            }
            currentSection.content.push(node);
        }
    });

    return sections.map((s) => ({
        title: s.title,
        content: s.content.map((el) => el.outerHTML).join(""),
    }));
}
