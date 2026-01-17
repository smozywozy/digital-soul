import { SOUL_PROFILES } from "./archetypeProfiles"
import { calculateSoulLevel } from "./soulLevel"

export function buildSoulMetadata(
  archetype: {
    name: string
    description: string
  },
  birthDate: string
) {
  const profile = SOUL_PROFILES[archetype.name]
  const soul = calculateSoulLevel(birthDate)

  return {
    name: `Digital Soul — ${archetype.name}`,
    description: archetype.description,
    attributes: [
      {
        trait_type: "Soul Archetype",
        value: archetype.name,
      },
      {
        trait_type: "Birth Date",
        value: birthDate,
      },
      {
        trait_type: "Soul Level",
        value: soul.level,
      },
      {
        trait_type: "Soul XP",
        value: soul.xp,
      },
      {
        trait_type: "Soul Title",
        value: soul.title,
      },
      {
        trait_type: "Essence",
        value: profile?.essence ?? "Unknown",
      },
      {
        trait_type: "Soul Path",
        value: profile?.path ?? "—",
      },
    ],
  }
}
