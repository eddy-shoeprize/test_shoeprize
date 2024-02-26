import { revalidate } from "@/lib";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
