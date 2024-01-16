"use server"

type SystemInfo = {
  lastUpdateTime: Date,
  lastYearEnergy: number,
  lastMonthEnergy: number,
  lastDayEnergy: number,
  currentEnergy: number
}
export async function getSystemInfo(): Promise<SystemInfo> {
  const url = `https://monitoringapi.solaredge.com/site/${process.env.SOLAREDGE_SITE_ID}/overview?api_key=${process.env.SOLAREDGE_API_KEY}`
  const response = await fetch(url)
  const data = await response.json()
  return {
    lastUpdateTime: new Date(data.overview.lastUpdateTime),
    lastYearEnergy: data.overview.lastYearData.energy,
    lastMonthEnergy: data.overview.lastMonthData.energy,
    lastDayEnergy: data.overview.lastDayData.energy,
    currentEnergy: data.overview.currentPower.power
  }
}