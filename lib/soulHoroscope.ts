function getSeed(date: Date) {
  return (
    date.getFullYear() * 10000 +
    (date.getMonth() + 1) * 100 +
    date.getDate()
  )
}

export function getDailyHoroscope(archetypeName: string) {
  const today = new Date()
  const seed = getSeed(today)

  const messages =
    require("./horoscopeTexts").DAILY_MESSAGES[archetypeName]

  if (!messages) return "The universe is quiet today."

  return messages[seed % messages.length]
}

export function getMonthlyHoroscope(archetypeName: string) {
  const now = new Date()
  const seed = now.getFullYear() * 100 + now.getMonth()

  const themes =
    require("./horoscopeTexts").MONTHLY_THEMES[archetypeName]

  if (!themes) return "A month of undefined transformation."

  return themes[seed % themes.length]
}
