"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="surface-card space-y-4 p-6"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input className="ring-focus rounded-2xl border border-border bg-canvas px-4 py-3 text-sm" placeholder="Full name" />
        <input className="ring-focus rounded-2xl border border-border bg-canvas px-4 py-3 text-sm" placeholder="Email address" type="email" />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="ring-focus rounded-2xl border border-border bg-canvas px-4 py-3 text-sm" placeholder="Phone / WhatsApp" />
        <input className="ring-focus rounded-2xl border border-border bg-canvas px-4 py-3 text-sm" placeholder="Topic" />
      </div>
      <textarea
        className="ring-focus min-h-36 w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm"
        placeholder="Tell us what you are looking for: restocks, pre-orders, card condition, or boutique imports."
      />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted">
          {submitted ? "Demo inquiry captured. Replace with your backend or email flow later." : "Front-end demo form only."}
        </p>
        <button className="ring-focus rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark" type="submit">
          Send inquiry
        </button>
      </div>
    </form>
  );
}
