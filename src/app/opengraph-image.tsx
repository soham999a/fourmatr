import { ImageResponse } from "next/og";

export const alt = "Matrka Applied Systems — Four intelligences. One architecture.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070502",
          color: "#F6F3EE",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 6 }}>
          <span style={{ color: "#CDA448" }}>MATRKA · APPLIED SYSTEMS</span>
          <span>KOLKATA — 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 78, lineHeight: 1.03, letterSpacing: -2 }}>
            Four intelligences.
          </div>
          <div style={{ display: "flex", fontSize: 78, lineHeight: 1.03, letterSpacing: -2, color: "#CDA448" }}>
            One architecture.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 1,
            width: "100%",
            background: "#45423B",
            marginTop: 24,
          }}
        />
        <div style={{ display: "flex", fontSize: 22, color: "#A29F9B" }}>
          appliedsystems.matrka.net
        </div>
      </div>
    ),
    size,
  );
}
