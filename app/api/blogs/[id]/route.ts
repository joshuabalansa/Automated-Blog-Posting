import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { NextRequest } from "next/server";

interface RouteContext {
  params: { id: string };
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = params;

  try {
    console.log("Fetching blog post with ID:", id);

    const { data: blog, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching blog:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
