import { SoulArchetype } from "./archetypes"

export function buildSoulMetadata(
  birthDate: string,
  archetype: SoulArchetype
) {
  const metadata = {
    name: "Digital Soul",
    description: "Your on-chain digital soul, revealed by birth date.",
    attributes: [
      {
        trait_type: "Soul Archetype",
        value: archetype.name,
      },
      {
        trait_type: "Birth Date",
        value: birthDate,
      },
    ],
  }

  return "data:application/json," + encodeURIComponent(JSON.stringify(metadata))
}
