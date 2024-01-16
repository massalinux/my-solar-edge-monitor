import { Card, CardBody, CardHeader } from "@nextui-org/react"
import LastUpdated from "@/app/(dashboard)/LastUpdated"
import { getSystemInfo, isSystemUp } from "@/utils"

export const dynamic = 'force-dynamic'

export async function SystemInfoCard() {
  const systemInfo = await getSystemInfo()
  const systemUp = await isSystemUp()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col justify-between">
          <h1 className="text-2xl font-bold">Info Impianto</h1>
          {`${systemInfo.lastUpdateTime}`}
          {`${new Date()}`}
          <LastUpdated date={systemInfo.lastUpdateTime} />
        </div>
      </CardHeader>
      <CardBody>
        { systemUp &&
            <div className="text-green-600">
                <p>Energia attuale:</p>
                <p className="text-3xl">{systemInfo.currentEnergy} WATT</p>
            </div>
        }
        {
          !systemUp &&
            <div className="text-red-600">
                <p>Impianto al momento non funzionante</p>
            </div>
        }
      </CardBody>
    </Card>
    )
}
