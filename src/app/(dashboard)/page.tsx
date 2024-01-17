import { SystemInfoCard } from "@/app/(dashboard)/SystemInfoCard"

export const dynamic = 'force-dynamic'

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-6">
      <SystemInfoCard />
    </main>
  )
}
