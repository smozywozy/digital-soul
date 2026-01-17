export type SoulProfile = {
  essence: string
  strengths: string[]
  path: string
}

export const SOUL_PROFILES: Record<string, SoulProfile> = {
  "The Seeker": {
    essence: "A soul driven by curiosity and the search for truth.",
    strengths: ["Curiosity", "Insight", "Adaptability"],
    path: "Growth comes through exploration and lived experience.",
  },

  "The Guardian": {
    essence: "A protective soul that values stability and care.",
    strengths: ["Loyalty", "Responsibility", "Empathy"],
    path: "Fulfillment is found in protecting and nurturing others.",
  },

  "The Creator": {
    essence: "A soul that expresses itself through creation.",
    strengths: ["Imagination", "Originality", "Vision"],
    path: "Your path unfolds when you dare to create without fear.",
  },

  "The Mystic": {
    essence: "A soul deeply connected to unseen realms.",
    strengths: ["Intuition", "Sensitivity", "Wisdom"],
    path: "Trust your inner voice — it knows the way.",
  },

  "The Warrior": {
    essence: "A courageous soul forged through challenge.",
    strengths: ["Determination", "Bravery", "Focus"],
    path: "Victory comes through disciplined action.",
  },

  "The Healer": {
    essence: "A soul devoted to restoration and balance.",
    strengths: ["Compassion", "Patience", "Understanding"],
    path: "Healing yourself allows you to heal the world.",
  },

  "The Visionary": {
    essence: "A soul that sees what others cannot yet imagine.",
    strengths: ["Foresight", "Innovation", "Clarity"],
    path: "Lead others by embodying your vision.",
  },

  "The Alchemist": {
    essence: "A soul that transforms pain into power.",
    strengths: ["Resilience", "Transformation", "Depth"],
    path: "Change is your natural state — embrace it.",
  },

  "The Explorer": {
    essence: "A soul born to experience the unknown.",
    strengths: ["Freedom", "Courage", "Curiosity"],
    path: "Your spirit thrives beyond comfort zones.",
  },

  "The Architect": {
    essence: "A soul that builds order from chaos.",
    strengths: ["Logic", "Structure", "Discipline"],
    path: "Your legacy is built step by step.",
  },

  "The Oracle": {
    essence: "A soul that perceives hidden patterns.",
    strengths: ["Perception", "Awareness", "Depth"],
    path: "Your insight guides others toward clarity.",
  },

  "The Luminary": {
    essence: "A radiant soul that inspires by presence.",
    strengths: ["Charisma", "Optimism", "Influence"],
    path: "Shine authentically — others will follow.",
  },
}
