import { ImageResponse } from "next/og";

export const alt = "Gut Check — stress-test your product idea before you build it";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fcfcfc",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#e13400",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            GUT CHECK YOUR PRODUCT
          </div>
          <div
            style={{
              display: "flex",
              color: "#1b1b1b",
              fontSize: 78,
              fontWeight: 700,
              lineHeight: 1.08,
              marginTop: 26,
              maxWidth: 960,
            }}
          >
            Stress-test your idea before you build it.
          </div>
          <div
            style={{
              display: "flex",
              color: "#474747",
              fontSize: 30,
              lineHeight: 1.4,
              marginTop: 28,
              maxWidth: 900,
            }}
          >
            A 15-minute PRD thinking exercise. Sharp questions, an honest reality check, and a
            build-ready brief. No AI here.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", color: "#1b1b1b", fontSize: 26, fontWeight: 500 }}>
            dennisdelgado.com/gutcheck
          </div>
          <div
            style={{
              display: "flex",
              background: "#e13400",
              color: "#ffffff",
              fontSize: 24,
              fontWeight: 700,
              padding: "14px 30px",
              borderRadius: 999,
            }}
          >
            Free · No sign-up
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
