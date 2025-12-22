export default function Loading() {
  return (
    <section className="project-detail-sec">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="skeleton" style={{ height: 380, borderRadius: 12 }} />
          </div>
          <div className="col-md-8" style={{ marginTop: 16 }}>
            <div className="skeleton" style={{ height: 28, width: "70%", borderRadius: 8 }} />
            <div style={{ height: 8 }} />
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div className="skeleton" style={{ height: 12, borderRadius: 6 }} />
              </div>
            ))}
          </div>
          <div className="col-md-4" style={{ marginTop: 16 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div className="skeleton" style={{ height: 48, borderRadius: 8 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
