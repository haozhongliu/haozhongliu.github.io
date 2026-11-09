import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ActivityGallery } from "../../components/ActivityGallery";
import { activitiesWithPage, getActivity } from "../../modules/activities";

export function generateStaticParams() {
	return activitiesWithPage.map((activity) => ({ slug: activity.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const activity = getActivity(slug);
	return { title: activity?.title ?? "Activity" };
}

export default async function ActivityPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const activity = getActivity(slug);

	if (!activity) {
		notFound();
	}

	return (
		<main className="activityPage">
			<Link href="/#experience" className="activityBack">
				← Back
			</Link>
			<h1 className="activityTitle">{activity.title}</h1>
			<div className="activityText">
				{(activity.paragraphs ?? []).map((paragraph, index) => (
					<p key={index}>{paragraph}</p>
				))}
			</div>
			<ActivityGallery images={activity.images ?? []} />
		</main>
	);
}
