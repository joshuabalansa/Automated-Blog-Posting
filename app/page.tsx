"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setPosts(data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Daily Tech Blog
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Stay updated with the latest in technology, AI, cybersecurity, and
            more.
          </p>
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Search blog posts..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article
                key={post.id}
                className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition"
              >
                <time className="text-xs text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </time>
                <h4 className="mt-3 text-xl font-semibold text-gray-900 hover:text-blue-600">
                  <a href={`/blog/${post.id}`}>
                    {post.title.replace(/<\/?[^>]+(>|$)/g, "")}
                  </a>
                </h4>
                <div
                  className="mt-4 text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: post.content.substring(0, 70),
                  }}
                />
                <a
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-block text-blue-600 hover:underline text-sm"
                >
                  Read More →
                </a>
              </article>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Loading...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
