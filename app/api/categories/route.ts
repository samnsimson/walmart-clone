import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
    return new NextResponse("Hello World!");
};
