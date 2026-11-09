import type { Metadata } from "next";
import Link from "next/link";

import { WritingsViewer } from "../components/WritingsViewer";
import { getWritings } from "../modules/writings";

export const metadata: Metadata = { title: "Writings | Haozhong Liu" };

export default function WritingsPage() {
	return (
		<main className="writingsPage">
			<Link href="/#journeys" className="activityBack">
				← Back
			</Link>
			<WritingsViewer writings={getWritings()} />
		</main>
	);
}
