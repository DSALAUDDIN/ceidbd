"use client";
import { useState } from "react";
import {
  Search,
  ArrowRight,
  BookOpen,
  CircleCheck,
  Clock3,
} from "lucide-react";
import Link from "next/link";
import { research } from "@/lib/data";
const categories = [
  {
    title: "Published",
    icon: BookOpen,
    description:
      "Our published research contributes to academic knowledge and public debates on critical social and development issues.",
  },
  {
    title: "Completed",
    icon: CircleCheck,
    description:
      "Our completed research examines inequality, livelihoods and wellbeing, contributing evidence for more inclusive development.",
  },
  {
    title: "Ongoing",
    icon: Clock3,
    description:
      "Our ongoing research explores emerging issues and critical challenges, with the aim of generating evidence to support more inclusive and sustainable futures.",
  },
];
export function ResearchExplorer() {
  const [query, setQuery] = useState("");
  const results = research.filter((item) =>
    `${item.title} ${item.theme} ${item.status}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="container research-search">
        <label className="search">
          <Search size={19} aria-hidden="true" />
          <input
            type="search"
            aria-label="Search research"
            placeholder="Search research, themes or keywords…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <p className="result-count" aria-live="polite">
          {results.length} research{" "}
          {results.length === 1 ? "project" : "projects"}
        </p>
      </div>
      {categories.map(({ title, icon: Icon, description }) => {
        const items = results.filter((item) => item.status === title);
        if (!items.length) return null;
        return (
          <section
            className="research-category"
            key={title}
            aria-labelledby={`research-${title.toLowerCase()}`}
          >
            <div className="container research-category-grid">
              <div className="research-category-intro">
                <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
                <h2 id={`research-${title.toLowerCase()}`}>{title}</h2>
                <p>{description}</p>
              </div>
              <ol className="research-list">
                {items.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/research/${item.slug}`}>
                      <span>{item.title}</span>
                      <ArrowRight size={19} aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        );
      })}
      {results.length === 0 && (
        <div className="container empty-state">
          <Search size={32} aria-hidden="true" />
          <h2>No matching research</h2>
          <p>Try another keyword or view all research.</p>
          <button className="button" onClick={() => setQuery("")}>
            View all research
          </button>
        </div>
      )}
    </>
  );
}
