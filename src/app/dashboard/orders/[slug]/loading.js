export default function Loading() {
  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <div className="row">
        <div className="col-md-7">
          <div className="skeleton" style={{ height: 260, borderRadius: 12 }} />
          <div style={{ height: 12 }} />
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div className="skeleton" style={{ height: 12, borderRadius: 6 }} />
            </div>
          ))}
        </div>
        <div className="col-md-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div className="skeleton" style={{ height: 64, borderRadius: 10 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
