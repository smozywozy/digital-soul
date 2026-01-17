"use client"

import { useState } from "react"
import { getSoulArchetype } from "@/lib/archetypes"
import { getZodiacSign } from "@/lib/zodiac"
import { getSoulFusionText } from "@/lib/fusionTexts"

export default function Page() {
  const [birthDate, setBirthDate] = useState("")
  const [revealed, setRevealed] = useState(false)

  const archetype = birthDate ? getSoulArchetype(birthDate) : null
  const zodiac = birthDate ? getZodiacSign(birthDate) : null
  const fusion = birthDate && archetype
    ? getSoulFusionText(birthDate, archetype.id)
    : null

  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(circle at top, #1a1a2e, #000)",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
      fontFamily: "serif"
    }}>
      <div style={{
        maxWidth: "520px",
        width: "100%",
        textAlign: "center",
        background: "rgba(255,255,255,0.05)",
        borderRadius: "24px",
        padding: "40px",
        boxShadow: "0 0 60px rgba(138,43,226,0.35)"
      }}>

        <h1 style={{ fontSize: "36px", marginBottom: "10px" }}>
          Digital Soul
        </h1>

        <p style={{ opacity: 0.7, marginBottom: "30px" }}>
          Discover the archetype of your soul
        </p>

        {!revealed && (
          <>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              style={{
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                width: "100%",
                marginBottom: "20px",
                fontSize: "16px"
              }}
            />

            <button
              onClick={() => setRevealed(true)}
              style={{
                padding: "14px 32px",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(90deg, #8a2be2, #00c6ff)",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(138,43,226,0.6)"
              }}
            >
              Reveal Your Soul
            </button>
          </>
        )}

        {revealed && archetype && (
          <div style={{ marginTop: "30px" }}>
            <h2 style={{ fontSize: "28px" }}>{archetype.name}</h2>
            <p style={{ fontStyle: "italic", opacity: 0.85 }}>
              {archetype.tagline}
            </p>

            <div style={{
              marginTop: "20px",
              padding: "20px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.06)"
            }}>
              <h3>Zodiac Sign</h3>
              <p>{zodiac}</p>

              <h3 style={{ marginTop: "20px" }}>Soul Fusion Reading</h3>
              <p style={{ opacity: 0.85 }}>{fusion}</p>
            </div>

            <button
              style={{
                marginTop: "30px",
                padding: "14px 32px",
                borderRadius: "999px",
                border: "none",
                background: "linear-gradient(90deg, #ff8a00, #e52e71)",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(255,138,0,0.6)"
              }}
            >
              Connect Wallet & Mint Soul NFT
            </button>
          </div>
        )}

      </div>
    </main>
  )
}
