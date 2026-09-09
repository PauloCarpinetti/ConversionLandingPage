import { ImageResponse } from "next/og";

export const alt = "Clínica Odontológica — cuide do seu sorriso";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem de capa para Open Graph/WhatsApp/Instagram (FR-001–FR-004, FR-006).
 * Gerada em build-time via next/og — sem foto real da clínica ainda, então o
 * placeholder reaproveita o nome e o gradiente já usados na Hero
 * (components/sections/hero.tsx) para manter a mesma identidade visual
 * (research.md #1, #4). Conteúdo centralizado com margem generosa nas bordas
 * para permanecer legível tanto em recortes mais quadrados (WhatsApp) quanto
 * mais largos (Facebook/Instagram) — research.md #2.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          padding: "0 140px",
          textAlign: "center",
          backgroundImage: "linear-gradient(to bottom, #f0f9ff, #ffffff)",
        }}
      >
        <div style={{ display: "flex", fontSize: 96 }}>🦷</div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#0c4a6e",
          }}
        >
          Clínica Odontológica
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#475569",
          }}
        >
          Cuide do seu sorriso com atendimento humanizado
        </div>
      </div>
    ),
    { ...size },
  );
}
