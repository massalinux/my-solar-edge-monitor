import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";
import { getSystemInfo } from "@/utils"
import LastUpdated from "@/app/(dashboard)/LastUpdated"

export default async function Home() {
  const systemInfo = await getSystemInfo();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-6">
      <Card className="w-full">
        <CardHeader>
          <div className="flex flex-col items-start justify-between">
            <h1 className="text-2xl font-bold">Info Impianto</h1>
            <LastUpdated date={systemInfo.lastUpdateTime} />
          </div>
        </CardHeader>
        <CardBody>
          {
              <p>Energia Attuale {systemInfo.currentEnergy} Watt</p>
          }
        </CardBody>
      </Card>
    </main>
  )
}
