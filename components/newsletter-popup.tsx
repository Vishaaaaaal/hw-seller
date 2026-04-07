"use client";

import { useState, useEffect } from "react";
import { NEWSLETTER_DISMISSED_KEY } from "@/lib/constants";

export function NewsletterPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const alreadyDismissed = localStorage.getItem(NEWSLETTER_DISMISSED_KEY);
        if (alreadyDismissed) return;

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem(NEWSLETTER_DISMISSED_KEY, "1");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleDismiss();
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 w-[340px] animate-in slide-in-from-bottom-8 fade-in duration-700">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
                {/* Decorative header */}
                <div className="absolute top-0 h-1 w-full bg-gradient-to-r from-primary to-primary-dark" />

                <button
                    onClick={handleDismiss}
                    className="absolute right-3 top-3 rounded-full p-1.5 text-muted hover:bg-canvas hover:text-text transition-colors"
                    aria-label="Close"
                >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6">
                    <div className="mb-5">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="font-display text-xl font-bold text-text">Unlock Collector Drops</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">Subscribe to be the first to know about new drops and exclusive offers.</p>
                    </div>

                    <form className="space-y-3" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                placeholder="Email address"
                                required
                                className="w-full rounded-xl border border-border bg-canvas px-4 py-2.5 text-sm text-text outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            />
                        </div>
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone number"
                                className="w-full rounded-xl border border-border bg-canvas px-4 py-2.5 text-sm text-text outline-none placeholder:text-muted focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:bg-primary-dark"
                        >
                            Get Early Access
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
