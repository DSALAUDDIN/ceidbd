"use client";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
export function ContactForm() {
  const [prepared, setPrepared] = useState(false);
  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const body = `Name: ${d.get("name")}\nEmail: ${d.get("email")}\nOrganisation: ${d.get("organisation") || "Not specified"}\n\n${d.get("message")}`;
        window.location.href = `mailto:info@ceid.org?subject=${encodeURIComponent(`CEID enquiry: ${d.get("subject")}`)}&body=${encodeURIComponent(body)}`;
        setPrepared(true);
      }}
    >
      <h2>Let’s start a conversation.</h2>
      <p>Tell us a little about yourself and what you have in mind.</p>
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input
            autoComplete="name"
            name="name"
            required
            maxLength={100}
            placeholder="Full name"
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            type="email"
            autoComplete="email"
            name="email"
            required
            maxLength={180}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label>
        Organisation / affiliation
        <input
          name="organisation"
          autoComplete="organization"
          maxLength={150}
          placeholder="University, organisation or independent"
        />
      </label>
      <label>
        Nature of enquiry
        <select name="subject">
          <option>Research collaboration</option>
          <option>Learning & training</option>
          <option>Partnerships</option>
          <option>Research associate interest</option>
          <option>Volunteering & events</option>
          <option>General enquiry</option>
        </select>
      </label>
      <label>
        Your message <span>*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          placeholder="How can we work together?"
        />
      </label>
      <label className="checkbox">
        <input type="checkbox" required />{" "}
        <span>
          I agree to share these details for the purpose of responding to my
          enquiry.
        </span>
      </label>
      <button className="button" type="submit">
        Prepare email enquiry <ArrowUpRight size={17} />
      </button>
      <small>
        This opens your email app. Review the draft and send it to complete your
        enquiry.
      </small>
      {prepared && (
        <div className="form-feedback" role="status">
          <Check size={20} />
          <p>
            Your email draft is ready to open. If your email app did not open,
            send your enquiry directly to{" "}
            <a href="mailto:info@ceid.org">info@ceid.org</a>. No message has
            been sent by this website.
          </p>
        </div>
      )}
    </form>
  );
}
