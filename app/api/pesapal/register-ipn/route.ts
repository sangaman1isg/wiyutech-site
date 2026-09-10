import { NextResponse } from "next/server";
import { registerIpn } from "@/src/lib/pesapal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/pesapal/register-ipn
// One-time setup: registers our webhook URL with Pesapal and returns an ipn_id.
// Copy that id into PESAPAL_IPN_ID in .env.local, then restart the dev server.
// (Re-run this with the production URL once deployed.)
export async function GET() {
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const result = await registerIpn(`${siteUrl}/api/webhooks/pesapal`);
    return NextResponse.json({
      ipn_id: result.ipn_id,
      registered_url: result.url,
      next: "Paste ipn_id into PESAPAL_IPN_ID in .env.local, then restart dev.",
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "register-ipn failed" },
      { status: 500 }
    );
  }
}
