import { generateBlog } from "@/lib/ai";
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    const { data: existingBlog, error: fetchError } = await supabase
      .from("blogs")
      .select("*")
      .gte("created_at", new Date().toISOString().split("T")[0]);



    if (fetchError) {
      console.error("Error fetching blog:", fetchError);
      return NextResponse.json({ error: "Database query failed" }, { status: 500 });
    }

    // if (existingBlog.length > 0) {
    //   return NextResponse.json({ message: "Blog already posted today" });
    // }

    const blogContent = await generateBlog();

    // Attempt to extract the title from the first h1 tag
    const titleMatch = blogContent.match(/<h1>(.*?)<\/h1>/i);
    const title = titleMatch ? titleMatch[1].trim() : "Untitled Blog";

    const { data, error } = await supabase
      .from("blogs")
      .insert([{ title: title || "Untitled", content: blogContent }])
      .select();

    if (error) {
      console.error("Error inserting blog:", error);
      return NextResponse.json({ error: "Failed to insert blog" }, { status: 500 });
    }

    return NextResponse.json({ blog: data });

  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}