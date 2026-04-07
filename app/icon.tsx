import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #2F5BFF, #2146CC)",
          color: "white",
          display: "flex",
          fontSize: 26,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        SW
      </div>
    ),
    size,
  );
}
