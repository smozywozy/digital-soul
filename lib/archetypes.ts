export type SoulArchetype = {
  id: string
  name: string
  description: string
}

export const ARCHETYPES: SoulArchetype[] = [
  {
    id: "seer",
    name: "The Seer",
    description: "A soul that sees beyond time and space.",
  },
  {
    id: "creator",
    name: "The Creator",
    description: "A soul that manifests ideas into reality.",
  },
  {
    id: "guardian",
    name: "The Guardian",
    description: "A soul that protects balance and truth.",
  },
  {
    id: "alchemist",
    name: "The Alchemist",
    description: "A soul that transforms pain into wisdom.",
  },
  {
    id: "wanderer",
    name: "The Wanderer",
    description: "A soul drawn to exploration and freedom.",
  },
  {
    id: "oracle",
    name: "The Oracle",
    description: "A soul connected to hidden knowledge.",
  },
  {
    id: "healer",
    name: "The Healer",
    description: "A soul that restores harmony.",
  },
  {
    id: "warrior",
    name: "The Warrior",
    description: "A soul of courage and action.",
  },
  {
    id: "mystic",
    name: "The Mystic",
    description: "A soul living between worlds.",
  },
  {
    id: "architect",
    name: "The Architect",
    description: "A soul that designs systems and structures.",
  },
  {
    id: "lover",
    name: "The Lover",
    description: "A soul driven by connection and beauty.",
  },
  {
    id: "sage",
    name: "The Sage",
    description: "A soul devoted to truth and understanding.",
  },
]

/**
 * Simple archetype selector based on birth date
 */
export function getSoulArchetype(birthDate: string): SoulArchetype | null {
  if (!birthDate) return null

  const day = new Date(birthDate).getDate()
  const index = day % ARCHETYPES.length

  return ARCHETYPES[index]
}
