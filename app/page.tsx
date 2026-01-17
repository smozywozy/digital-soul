"use client"

import { useState } from "react"
import { getSoulArchetype } from "@/lib/archetypes"
import { getZodiacSign } from "@/lib/zodiac"
import { FUSION_READINGS } from "@/lib/fusionTexts"

export default function Page() {
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState<any | null>(null)

  function handleReveal() {
    if (!birthDate) return

    const archetype = getSoulArchetype(birthDate)
    const zodiac = getZodiacSign(birthDate)

    const key = `${zodiac}-${archetype.name}`
    const fusion =
      FUSION_READINGS[key] ??
      "Your soul carries a rare and undefined fusion energy."

    setResult({ archetype, zodiac, fusion })
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1b1b2f 0%, #0b0b12 70%)",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Georgia, serif",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 460,
          background: "rgba(255,255,255,0.05)",
          borderRadius: 24,
          padding: 32,
          boxShadow: "0 0 40px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            letterSpacing: 1,
            marginBottom: 24,
          }}
        >
          Digital Soul
        </h1>

        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 14,
            border: "none",
            fontSize: 16,
            marginBottom: 16,
          }}
        />

        <button
          onClick={handleReveal}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 14,
            border: "none",
            fontSize: 16,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #a78bfa, #f472b6)",
            color: "#0b0b12",
            cursor: "pointer",
          }}
        >
          Reveal Your Soul
        </button>

        {result && (
          <div style={{ marginTop: 36 }}>
            {/* Archetype */}
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ marginBottom: 6 }}>
                {result.archetype.name}
              </h2>
              <p style={{ opacity: 0.85 }}>
                {result.archetype.description}
              </p>
            </div>

            {/* Zodiac */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ marginBottom: 4 }}>Zodiac Sign</h3>
              <p style={{ opacity: 0.85 }}>{result.zodiac}</p>
            </div>

            {/* Fusion */}
            <div
              style={{
                padding: 20,
                borderRadius: 18,
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
              }}
            >
              <h3 style={{ marginBottom: 8 }}>
                Soul Fusion Reading
              </h3>
              <p style={{ lineHeight: 1.6 }}>
                {result.fusion}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
