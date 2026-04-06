"use client";

import { FormEvent, useState } from "react";
import { allBrands, allCategories, allScales, allVehicleTypes } from "@/lib/catalog";
import { CloseIcon } from "@/components/icons";
import { useRouter } from "next/navigation";

export function AddProductModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData(e.currentTarget);
            const res = await fetch("/api/products", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                onClose();
                router.refresh();
            } else {
                alert("Failed to publish the listing. Check console.");
            }
        } catch (err) {
            alert(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6"
            onClick={onClose}
        >
            <div
                className="relative flex w-full max-w-xl max-h-[90vh] flex-col overflow-hidden rounded-[32px] border border-border bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-shrink-0 items-center justify-between border-b border-border bg-canvas p-6 sm:px-8">
                    <div>
                        <h2 className="font-display text-2xl font-bold text-text">Add New Listing</h2>
                        <p className="text-sm text-muted">Create a new diecast product entry for the storefront.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-border text-muted hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                        <CloseIcon className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-text mb-1.5">Product Title</label>
                            <input type="text" name="title" required placeholder="e.g. Nissan Skyline GT-R (R34)" className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-1.5">Brand</label>
                                <select name="brand" required className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                                    <option value="">Select Brand...</option>
                                    {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-1.5">Category</label>
                                <select name="category" required className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                                    <option value="">Select Category...</option>
                                    {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-1.5">Scale</label>
                                <select name="scale" required className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                                    <option value="">Select Scale...</option>
                                    {allScales.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-1.5">Vehicle Type</label>
                                <select name="vehicleType" required className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none">
                                    <option value="">Select Vehicle...</option>
                                    {allVehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 mt-2">
                            <div>
                                <label className="block text-sm font-semibold text-text mb-1.5">Internal Quantity</label>
                                <input type="number" name="quantity" min="0" required placeholder="0" className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-text mb-1.5">Retail Price (₹)</label>
                                <input type="number" name="price" step="0.01" min="0" required placeholder="0.00" className="w-full rounded-2xl border border-border bg-canvas px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                            </div>
                        </div>

                        <div className="pt-2">
                            <label className="block text-sm font-semibold text-text mb-1.5">Hero Image</label>
                            <label className="mt-1 flex justify-center rounded-2xl border border-dashed border-border px-6 pt-5 pb-6 bg-canvas hover:border-primary/50 transition-colors cursor-pointer group">
                                <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-10 w-10 text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div className="flex text-sm text-muted justify-center">
                                        <span className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary-dark">
                                            <span>Upload a file</span>
                                            <input name="image" type="file" className="sr-only" accept="image/*" />
                                        </span>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-muted/70">PNG, JPG up to 10MB</p>
                                </div>
                            </label>
                        </div>

                    </div>

                    <div className="mt-8 flex items-center justify-end gap-3 border-t border-border pt-6">
                        <button type="button" onClick={onClose} className="rounded-full px-6 py-2.5 text-sm font-semibold text-text hover:bg-canvas transition-colors">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-full bg-primary px-8 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary-dark disabled:opacity-50"
                        >
                            {isSubmitting ? "Publishing..." : "Publish Listing"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
