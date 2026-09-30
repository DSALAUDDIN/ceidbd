"use client";
import { useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { research } from "@/lib/data";
const statuses = [
  "All",
  "Published",
  "Ongoing",
  "Completed",
  "Research Briefs",
];
export function ResearchExplorer() {
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("All themes");
  const results = research.filter(
    (r) =>
      (status === "All" || r.status === status) &&
      (theme === "All themes" || r.theme === theme) &&
      `${r.title} ${r.summary} ${r.theme}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <div className="search-row">
        <label className="search">
          <Search size={19} />
          <input
            type="search"
            aria-label="Search research"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search research, themes or keywords…"
          />
        </label>
        <select
          aria-label="Filter by research theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {[
            "All themes",
            "Inclusive Health",
            "Inclusive Education",
            "Community Wellbeing",
            "Social Development",
          ].map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className="filters" role="group" aria-label="Research status">
        {statuses.map((s) => (
          <button
            key={s}
            aria-pressed={status === s}
            className={status === s ? "active" : ""}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="result-count" aria-live="polite">
        {results.length}{" "}
        {results.length === 1 ? "research overview" : "research overviews"}
      </div>
      <div className="research-grid">
        {results.map((r, i) => (
          <Link
            className="research-card"
            key={r.slug}
            href={`/research/${r.slug}`}
          >
            <div className="card-top">
              <span className={`badge ${r.status === "Ongoing" ? "gold" : ""}`}>
                {r.status === "Research Briefs" ? "Research brief" : r.status}
              </span>
              <ArrowUpRight size={20} />
            </div>
            <span className="research-number">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3>{r.title}</h3>
            <p>{r.summary}</p>
            <div className="card-bottom">
              {r.theme}
              <span>Read overview →</span>
            </div>
          </Link>
        ))}
      </div>
      {results.length === 0 && (
        <div className="empty-state">
          <Search size={32} />
          <h3>No research to show here yet.</h3>
          <p>
            {status === "Completed"
              ? "Completed studies will appear here when their details are available."
              : "Try another keyword, theme or status."}
          </p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setTheme("All themes");
              setStatus("All");
            }}
          >
            View all research
          </button>
        </div>
      )}
    </>
  );
}
