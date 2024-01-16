const apiUrl = `https://monitoringapi.solaredge.com/site/${process.env.SOLAREDGE_SITE_ID}/overview?api_key=${process.env.SOLAREDGE_API_KEY}`
const threshold = 30 * 60; //30 minutes

type SystemInfo = {
  lastUpdateTime: Date,
  lastYearEnergy: number,
  lastMonthEnergy: number,
  lastDayEnergy: number,
  currentEnergy: number
}
export async function getSystemInfo(): Promise<SystemInfo> {
  const response = await fetch(apiUrl, {
    next: {
      revalidate: 60
    }
  })
  const data = await response.json()

  return {
    lastUpdateTime: new Date(data.overview.lastUpdateTime + " GMT+0100"),
    lastYearEnergy: data.overview.lastYearData.energy,
    lastMonthEnergy: data.overview.lastMonthData.energy,
    lastDayEnergy: data.overview.lastDayData.energy,
    currentEnergy: Math.round(data.overview.currentPower.power)
  }
}


export async function isSystemUp(): Promise<boolean> {
  const systemInfo = await getSystemInfo();
  const now = new Date();
  const elapsedTime = Math.floor(+now - +systemInfo.lastUpdateTime) / 1000

  if (elapsedTime > threshold) return false;
  if ( now.getHours() > 9 && now.getHours() < 16 && systemInfo.currentEnergy < 10 ) return false;

  return true;
}
