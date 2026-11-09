"use client";

import { useState } from "react";

import type { Writing } from "../modules/writings";

type WritingsViewerProps = {
	writings: Writing[];
};

export function WritingsViewer({ writings }: WritingsViewerProps) {
	const [activeSlug, setActiveSlug] = useState(writings[0]?.slug);
	const active = writings.find((writing) => writing.slug === activeSlug) ?? writings[0];

	if (!active) return null;

	return (
		<div className="writingsLayout">
			<nav className="writingsList" aria-label="Writings">
				{writings.map((writing) => (
					<button
						type="button"
						key={writing.slug}
						className={`writingsItem ${writing.slug === active.slug ? "isActive" : ""}`}
						onClick={() => setActiveSlug(writing.slug)}
						aria-current={writing.slug === active.slug}
					>
						{writing.title}
					</button>
				))}
			</nav>
			<article className="writingsBody" aria-live="polite">
				<h2 className="writingsTitle">{active.title}</h2>
				{active.content.split("\n\n").map((paragraph, index) => (
					<p key={index} className="writingsParagraph">
						{paragraph}
					</p>
				))}
			</article>
		</div>
	);
}
