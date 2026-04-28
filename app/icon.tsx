import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 22,
          background: "#08080b",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ef2d2d",
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "-0.05em",
        }}
      >
        W
      </div>
    ),
    { ...size }
  );
}