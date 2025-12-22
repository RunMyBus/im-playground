"use client";
import OptimizedImage from "@/app/components/OptimizedImage";

export default function PartnerCard({ item, reverse }) {
    return (
        <div className={`theme-card public-card partner-card ${reverse ? "public-reverse" : ""}`}>

        <div className="row align-items-start">

                {/* IMAGE */}
                <div className="col-md-4">
                    <div className="public-img">
                        <OptimizedImage
                            src={item.image}
                            alt={item.name}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                    </div>
                </div>

                {/* CONTENT */}
                <div className="col-md-8 public-content">
                    <h2>{item.name}</h2>
                    <h5>{item.designation}</h5>
                    <p>{item.content}</p>
                </div>

            </div>
        </div>
    );
}
