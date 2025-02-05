import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }

    return NextResponse.json({ blogs: data });

  } catch (error: any) {
    console.error("Error in fetching blogs API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
