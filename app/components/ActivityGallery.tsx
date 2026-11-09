"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

type ActivityGalleryProps = {
	images: { src: string; alt: string }[];
};

export function ActivityGallery({ images }: ActivityGalleryProps) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [offset, setOffset] = useState<number | null>(null);
	const [isReady, setIsReady] = useState(false);
	const galleryRef = useRef<HTMLDivElement>(null);
	const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
	const hasMeasured = useRef(false);
	const count = images.length;

	// Centers the active slide; slides keep their natural width, so neighbours peek in from the sides.
	const measure = useCallback(() => {
		const gallery = galleryRef.current;
		const slide = slideRefs.current[activeIndex];
		if (!gallery || !slide) return;

		setOffset(gallery.clientWidth / 2 - (slide.offsetLeft + slide.offsetWidth / 2));

		if (!hasMeasured.current) {
			hasMeasured.current = true;
			requestAnimationFrame(() => setIsReady(true));
		}
	}, [activeIndex]);

	useEffect(() => {
		const gallery = galleryRef.current;
		if (!gallery) return;

		const observer = new ResizeObserver(measure);
		observer.observe(gallery);
		slideRefs.current.forEach((slide) => slide && observer.observe(slide));

		return () => observer.disconnect();
	}, [measure, count]);

	if (count === 0) return null;

	const isSingle = count === 1;
	const goTo = (index: number) => setActiveIndex(Math.min(Math.max(index, 0), count - 1));

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "ArrowLeft") goTo(activeIndex - 1);
		if (event.key === "ArrowRight") goTo(activeIndex + 1);
	};

	return (
		<div
			ref={galleryRef}
			className="activityGallery"
			tabIndex={isSingle ? undefined : 0}
			onKeyDown={isSingle ? undefined : handleKeyDown}
			aria-roledescription={isSingle ? undefined : "carousel"}
		>
			<div
				className={`activityTrack ${isReady ? "isReady" : ""}`}
				style={{
					transform: offset === null ? undefined : `translateX(${offset}px)`,
					opacity: offset === null ? 0 : 1,
				}}
			>
				{images.map((image, index) => {
					const distance = Math.abs(index - activeIndex);
					const state = distance === 0 ? "isActive" : distance === 1 ? "isPeek" : "isHidden";

					return (
						<div
							key={`${image.src}-${index}`}
							ref={(node) => {
								slideRefs.current[index] = node;
							}}
							className={`activitySlide ${state}`}
							onClick={state === "isPeek" ? () => goTo(index) : undefined}
							aria-hidden={state !== "isActive"}
						>
							<Image
								src={image.src}
								alt={image.alt}
								width={0}
								height={0}
								sizes="(max-width: 760px) 100vw, 760px"
								className="activitySlideImage"
								style={{ width: "auto", height: "100%" }}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
