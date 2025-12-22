export default function Loading() {
  return (
    <section className="project-detail-sec home-sec1">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="skeleton" style={{ height: 320, borderRadius: 12 }} />
          </div>
          <div className="col-md-12" style={{ marginTop: 16 }}>
            <div className="skeleton" style={{ height: 28, width: "60%", borderRadius: 8 }} />
            <div style={{ height: 8 }} />
            <div className="skeleton" style={{ height: 14, width: "30%", borderRadius: 6 }} />
            <div style={{ height: 16 }} />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div className="skeleton" style={{ height: 12, borderRadius: 6 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
