import { notFound } from "next/navigation";
import { Metadata } from "next";

async function getPost(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/blogs/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return undefined;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return undefined;
  }
}

interface Props {
  params: { id: string };
}

interface Hashtag {
  name: string;
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata | undefined> {
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.blog?.title?.replace(/<\/?[^>]+(>|$)/g, "") || "Untitled",
    description: "Read the full blog post here.",
  };
}

export default async function BlogPost({ params: { id } }: Props) {
  const post = await getPost(id);

  if (!post?.blog) {
    return notFound();
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="w-full max-w-4xl bg-white p-8 sm:p-12 rounded-lg shadow-lg">
        {/* Back Button */}
        <div className="mb-6">
          <a href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </a>
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none">
          {/* Blog Title */}
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            {post.blog.title?.replace(/<\/?[^>]+(>|$)/g, "")}
          </h1>

          {/* Blog Meta Information */}
          <div className="text-center text-gray-500 text-sm mt-2">
            Published on {new Date(post.blog.created_at).toLocaleDateString()}
          </div>

          {/* Blog Content */}
          <div className="mt-6 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.blog.content }} />

          {/* Hashtags */}
          {post.blog.hashtags && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {post.blog.hashtags.split(", ").map((tag: string) => (
                <span key={tag} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
