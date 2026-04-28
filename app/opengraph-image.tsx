import { ImageResponse } from "next/og";

export const alt = "Wiyule Technology — Built for your business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#08080b",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Red glow accent */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(239,45,45,0.35), transparent 70%)",
          }}
        />

        {/* Top — pulse + tagline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#9c968e",
            fontSize: 22,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ef2d2d",
            }}
          />
          Now serving Malawi & Zambia
        </div>

        {/* Center — main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 124,
              fontWeight: 800,
              color: "#f4efe8",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
            }}
          >
            <span>Built for</span>
            <span style={{ color: "#ef2d2d" }}>your</span>
            <span>business.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#9c968e",
              maxWidth: 800,
              lineHeight: 1.3,
            }}
          >
            Websites, booking systems & AI WhatsApp assistants — built in Lusaka.
          </div>
        </div>

        {/* Bottom — brand mark */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#5a5752",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#f4efe8",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                background: "#ef2d2d",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              W
            </div>
            Wiyule Technology
          </div>
          <div>wiyutech.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}