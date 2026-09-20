"use client";

import { useEffect, useState } from "react";

const COUNTER_NAMESPACE = "kayl-homepage";
const COUNTER_KEY = "site-total-views";
const SESSION_FLAG = "homepage-view-counted-v1";

function formatViews(value: number) {
	return new Intl.NumberFormat("en-US").format(value);
}

export function ViewCounter() {
	const [views, setViews] = useState<number | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function loadViews() {
			const hasCounted = typeof window !== "undefined" && sessionStorage.getItem(SESSION_FLAG) === "1";
			const action = hasCounted ? "get" : "hit";

			if (!hasCounted) {
				sessionStorage.setItem(SESSION_FLAG, "1");
			}

			try {
				const response = await fetch(
					`https://api.countapi.xyz/${action}/${COUNTER_NAMESPACE}/${COUNTER_KEY}`,
					{ cache: "no-store" },
				);
				if (!response.ok) return;

				const data = (await response.json()) as { value?: number };
				if (!cancelled && typeof data.value === "number") {
					setViews(data.value);
				}
			} catch {
				// Keep the footer quiet if the counter service is unavailable.
			}
		}

		void loadViews();

		return () => {
			cancelled = true;
		};
	}, []);

	if (views === null) {
		return (
			<p className="siteViewCounter" aria-label="Site total views">
				<span className="siteViewCounterLabel">Views</span>
				<span className="siteViewCounterValue">...</span>
			</p>
		);
	}

	return (
		<p className="siteViewCounter" aria-label="Site total views">
			<span className="siteViewCounterLabel">Views</span>
			<span className="siteViewCounterValue">{formatViews(views)}</span>
		</p>
	);
}
