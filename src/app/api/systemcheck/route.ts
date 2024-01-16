import { NextResponse } from 'next/server';
import { isSystemUp } from "@/utils"
import { sendEmail } from "@/send-in-blue"

export async function GET(request: Request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", {
      status: 401
    })
  }

  const systemUp = await isSystemUp();
  if (!systemUp){
    await sendEmail({
      to: process.env.NOTIFICATION_EMAIL!,
      subject: "Solar Edge is down",
      text: "System is down"
    })
  } else {
    await sendEmail({
      to: process.env.NOTIFICATION_EMAIL!,
      subject: "Solar Edge is back up",
      text: "System is back up"
    })
  }
  return new NextResponse(JSON.stringify(systemUp));
}
