import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { ARTICLES } from "./Blogs";
import SetPageTitle from "./SetPageTitle";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://www.rathnabhoomidevelopers.in";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(() => ARTICLES[slug], [slug]);

  // 404 / not-found case
  if (!post) {
    return (
      <>
        <SetPageTitle title="Post not found" />
        <SiteHeader />

        {/* SEO for 404 */}
        <Helmet>
          <title>Post not found | Rathna Bhoomi Developers</title>
          <link rel="canonical" href={`${BASE_URL}/blogs`} />
          <meta name="robots" content="noindex,follow" />
        </Helmet>

        <main className="min-h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
          <p className="mb-6">
            The link may be incorrect or the article was removed.
          </p>
          <Link to="/blogs" className="text-rose-600">
            ← Back to all posts
          </Link>
        </main>

        <SiteFooter />
      </>
    );
  }

  return (
    <>
      {/* This will still keep your generic page-title handling consistent */}
      <SetPageTitle title={post.title} />

      <SiteHeader />

      {/* ✅ Canonical + SEO per blog post */}
      <Helmet>
        <title>{post.title} | Rathna Bhoomi Developers</title>
        <link
          rel="canonical"
          href={`${BASE_URL}/blog/${slug}`}
        />
        {post.excerpt && (
          <meta name="description" content={post.excerpt} />
        )}
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 justify-center bg-gradient-to-r from-amber-900 to-rose-900 py-20 mt-lg-5"
      >
        <div className="flex justify-center pt-10 text-white fw-bold text-center px-4 md:px-16 lg:px-28 text-3xl md:text-4xl">
          {post.title}
        </div>

        <div className="flex justify-center fs-5 py-10 text-white text-center">
          <span className="bi bi-person">
            &nbsp;&nbsp;{post.author}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span className="bi bi-calendar-check-fill">
            &nbsp;&nbsp;{post.date}
            {/* If you want formatted date instead: {formatDate(post.date)} */}
          </span>
        </div>

        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb flex justify-center text-white space-x-2">
              <li className="breadcrumb-item">
                <Link to="/" className="hover:text-amber-300">
                  Home
                </Link>
              </li>
              <span>&gt;&gt;</span>
              <li className="breadcrumb-item">
                <Link to="/blogs" className="hover:text-amber-300">
                  Blog
                </Link>
              </li>
              <span>&gt;&gt;</span>
              <li className="breadcrumb-item text-slate-300 active">
                {post.title}
              </li>
            </ol>
          </nav>
        </div>
      </motion.div>

      <main className="min-h-screen w-full bg-stone-50 px-4 md:px-6 py-12">
        <article className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <section className="relative z-[2] prose max-w-none blog-article overflow-x-hidden mt-10">
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
