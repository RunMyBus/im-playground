const ICON_MAP = {
    "Project Detail": "detail",
    "Objective": "objective",
    "Objectives": "objective",
    "Scope of Work": "scope",
    "Project Location": "location",
    "Location Map": "map",
    "Outcome": "outcome",
};

export default function LovableProjectCard({ title, children }) {
    const iconType = ICON_MAP[title] || "detail";

    return (
        <div className="lovable-card">
            <h3 data-icon={iconType}>{title}</h3>

            <div
                className="lovable-card-body"
                dangerouslySetInnerHTML={{ __html: children }}
            />
        </div>
    );
}
