export function calculateSoulLevel(birthDate: string) {
  const birth = new Date(birthDate)
  const now = new Date()

  const years =
    now.getFullYear() -
    birth.getFullYear() -
    (now <
    new Date(
      now.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    )
      ? 1
      : 0)

  const level = Math.max(1, years)
  const xp = years * 100

  return {
    level,
    xp,
    title: getSoulTitle(level),
  }
}

function getSoulTitle(level: number) {
  if (level < 5) return "Awakening Soul"
  if (level < 12) return "Seeking Soul"
  if (level < 25) return "Integrated Soul"
  if (level < 40) return "Ascended Soul"
  return "Eternal Soul"
}
