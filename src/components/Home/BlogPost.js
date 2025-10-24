import React, { useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
// we exported ARTICLES from Blogs.js earlier
import { ARTICLES } from "./Blogs";
import SetPageTitle from "./SetPageTitle";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(() => ARTICLES[slug], [slug]);

  useEffect(() => {
    if (post?.title) document.title = `${post.title} | Rathna Bhoomi Developers`;
  }, [post]);

  if (!post) {
    return (
      <>
      <SetPageTitle title={post ? post.title : "Post not found"} />
        <SiteHeader />
        <main className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="mb-6">The link may be incorrect or the article was removed.</p>
          <Link to="/blogs" className="text-rose-600">← Back to all posts</Link>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen px-4 md:px-3 py-5 pt-[110px] bg-stone-50">
         <article className="relative max-w-4xl mx-auto bg-white rounded-2xl shadow  md:p-4">
            <section
              className="relative z-[2] prose max-w-none blog-article overflow-x-hidden mt-10"
            >
              <div
                className="blog-content-wrapper"
                style={{
                  maxWidth: "100%",
                  width: "100%",
                  overflowWrap: "break-word",
                }}
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </section>

            <div className="mt-10">
              <Link to="/blogs" className="btn btn-outline-secondary">
                ← Back to all posts
              </Link>
            </div>
          </article>

      </main>
      <SiteFooter />
    </>
  );
}
