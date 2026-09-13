"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
	travelMapDevConfig,
	travelMapConfig,
	type TravelMapPoint,
	type TravelMapSmallPoint,
} from "../modules/travelMap";

const WORLD_MAP_ASSET = "/world-map.min.svg";

type WorldMapCanvasProps = {
	className?: string;
};

type SvgCountryPath = {
	countryId: string;
	shape: Path2D;
};

type ParsedMap = {
	paths: SvgCountryPath[];
	viewBoxMinX: number;
	viewBoxMinY: number;
	viewBoxWidth: number;
	viewBoxHeight: number;
};

type HoverCard = {
	positionX: number;
	positionY: number;
	entry: TravelMapPoint;
};

type HoverSmallPoint = {
	positionX: number;
	positionY: number;
	entry: TravelMapSmallPoint;
};

type DevCursorCoordinates = {
	mapX: number;
	mapY: number;
	insideMap: boolean;
};

export function WorldMapCanvas({ className }: WorldMapCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mapRef = useRef<ParsedMap | null>(null);
	const hoveredPointIdRef = useRef<string | null>(null);
	const hoveredSmallPointIdRef = useRef<string | null>(null);
	const [hoverCard, setHoverCard] = useState<HoverCard | null>(null);
	const [hoverSmallPoint, setHoverSmallPoint] = useState<HoverSmallPoint | null>(null);
	const [devCursorCoordinates, setDevCursorCoordinates] = useState<DevCursorCoordinates | null>(null);

	const visitedCountryIds = useMemo(
		() =>
			new Set(travelMapConfig.visitedCountries.map((country) => country.countryId.toLowerCase())),
		[],
	);

	const mapPoints = useMemo(() => travelMapConfig.points, []);
	const mapSmallPoints = useMemo(() => travelMapConfig.smallPoints, []);

	useEffect(() => {
		const isCoordinatePickerEnabled = travelMapDevConfig.enableCoordinatePicker;
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const context = canvas.getContext("2d");
		if (!context) {
			return;
		}

		let frameId = 0;
		let drawScale = 1;
		let drawOffsetX = 0;
		let drawOffsetY = 0;

		const projectPointToCanvas = (x: number, y: number) => {
			const map = mapRef.current;
			if (!map) {
				return null;
			}

			return {
				x: drawOffsetX + (x - map.viewBoxMinX) * drawScale,
				y: drawOffsetY + (y - map.viewBoxMinY) * drawScale,
			};
		};

		const projectCanvasToMap = (x: number, y: number) => {
			const map = mapRef.current;
			if (!map || drawScale <= 0) {
				return null;
			}

			const mapX = (x - drawOffsetX) / drawScale + map.viewBoxMinX;
			const mapY = (y - drawOffsetY) / drawScale + map.viewBoxMinY;

			const insideMap =
				mapX >= map.viewBoxMinX &&
				mapY >= map.viewBoxMinY &&
				mapX <= map.viewBoxMinX + map.viewBoxWidth &&
				mapY <= map.viewBoxMinY + map.viewBoxHeight;

			return {
				mapX,
				mapY,
				insideMap,
			};
		};

		const findPointAtPosition = (x: number, y: number) => {
			if (drawScale <= 0) {
				return null;
			}

			const hoverRadius = Math.max(8, travelMapConfig.pointRadius + 3);
			let closestPoint: TravelMapPoint | null = null;
			let minDistance = Number.POSITIVE_INFINITY;

			for (const point of mapPoints) {
				const projected = projectPointToCanvas(point.x, point.y);
				if (!projected) {
					continue;
				}

				const distance = Math.hypot(projected.x - x, projected.y - y);
				if (distance <= hoverRadius && distance < minDistance) {
					minDistance = distance;
					closestPoint = point;
				}
			}

			return closestPoint;
		};

		const findSmallPointAtPosition = (x: number, y: number) => {
			if (drawScale <= 0) {
				return null;
			}

			const hoverRadius = Math.max(6, travelMapConfig.smallPointRadius + 3);
			let closestPoint: TravelMapSmallPoint | null = null;
			let minDistance = Number.POSITIVE_INFINITY;

			for (const point of mapSmallPoints) {
				const projected = projectPointToCanvas(point.x, point.y);
				if (!projected) {
					continue;
				}

				const distance = Math.hypot(projected.x - x, projected.y - y);
				if (distance <= hoverRadius && distance < minDistance) {
					minDistance = distance;
					closestPoint = point;
				}
			}

			return closestPoint;
		};

		const draw = () => {
			const width = canvas.clientWidth;
			const height = canvas.clientHeight;
			const map = mapRef.current;

			if (width === 0 || height === 0 || !map) {
				return;
			}

			const dpr = window.devicePixelRatio || 1;
			const displayWidth = Math.floor(width * dpr);
			const displayHeight = Math.floor(height * dpr);

			if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
				canvas.width = displayWidth;
				canvas.height = displayHeight;
			}

			context.setTransform(dpr, 0, 0, dpr, 0, 0);
			context.clearRect(0, 0, width, height);
			context.fillStyle = travelMapConfig.oceanColor;
			context.fillRect(0, 0, width, height);

			drawScale = Math.min(width / map.viewBoxWidth, height / map.viewBoxHeight);
			drawOffsetX = (width - map.viewBoxWidth * drawScale) / 2;
			drawOffsetY = (height - map.viewBoxHeight * drawScale) / 2;

			context.save();
			context.translate(
				drawOffsetX - map.viewBoxMinX * drawScale,
				drawOffsetY - map.viewBoxMinY * drawScale,
			);
			context.scale(drawScale, drawScale);

			for (const path of map.paths) {
				const isVisited = visitedCountryIds.has(path.countryId);

				context.fillStyle = isVisited
					? travelMapConfig.visitedCountryColor
					: travelMapConfig.baseCountryColor;
				context.fill(path.shape);
			}

			context.lineWidth = 0.7 / drawScale;
			context.strokeStyle = travelMapConfig.borderColor;
			for (const path of map.paths) {
				context.stroke(path.shape);
			}

			const pointRadiusInMap = travelMapConfig.pointRadius / drawScale;
			for (const point of mapPoints) {
				const isHovered = hoveredPointIdRef.current === point.id;
				const radius = isHovered ? pointRadiusInMap * 1.52 : pointRadiusInMap;

				context.save();
				context.beginPath();
				context.arc(point.x, point.y, radius, 0, Math.PI * 2);
				context.fillStyle = isHovered
					? travelMapConfig.pointHoverColor
					: travelMapConfig.pointColor;
				if (isHovered) {
					context.shadowColor = "rgba(41, 168, 253, 0.78)";
					context.shadowBlur = 16;
				}
				context.fill();
				context.lineWidth = (isHovered ? 1.8 : 1.4) / drawScale;
				context.strokeStyle = isHovered ? "#fff7ec" : travelMapConfig.visitedCountryColor;
				context.stroke();
				context.restore();
			}

			const smallPointRadiusInMap = travelMapConfig.smallPointRadius / drawScale;
			for (const point of mapSmallPoints) {
				const isHovered = hoveredSmallPointIdRef.current === point.id;
				const radius = isHovered ? smallPointRadiusInMap * 1.72 : smallPointRadiusInMap;

				if (isHovered) {
					context.save();
					context.beginPath();
					context.arc(point.x, point.y, radius * 2.15, 0, Math.PI * 2);
					context.fillStyle = "rgba(255, 244, 232, 0.38)";
					context.fill();
					context.restore();
				}

				context.save();
				context.beginPath();
				context.arc(point.x, point.y, radius, 0, Math.PI * 2);
				context.fillStyle = isHovered
					? travelMapConfig.smallPointHoverColor
					: travelMapConfig.smallPointColor;
				if (isHovered) {
					context.shadowColor = "rgba(41, 168, 253, 0.78)";
					context.shadowBlur = 14;
				}
				context.fill();
				context.lineWidth = (isHovered ? 1.4 : 1) / drawScale;
				context.strokeStyle = isHovered ? "#fff8ee" : travelMapConfig.visitedCountryColor;
				context.stroke();
				context.restore();
			}

			context.restore();
		};

		const requestDraw = () => {
			cancelAnimationFrame(frameId);
			frameId = requestAnimationFrame(draw);
		};

		const handleMouseMove = (event: MouseEvent) => {
			if (isCoordinatePickerEnabled) {
				const mapCoordinates = projectCanvasToMap(event.offsetX, event.offsetY);
				if (mapCoordinates) {
					setDevCursorCoordinates({
						mapX: mapCoordinates.mapX,
						mapY: mapCoordinates.mapY,
						insideMap: mapCoordinates.insideMap,
					});
				}
			}

			const hoveredPoint = findPointAtPosition(event.offsetX, event.offsetY);
			const hoveredSmallPoint = hoveredPoint
				? null
				: findSmallPointAtPosition(event.offsetX, event.offsetY);

			hoveredPointIdRef.current = hoveredPoint ? hoveredPoint.id : null;
			hoveredSmallPointIdRef.current = hoveredSmallPoint ? hoveredSmallPoint.id : null;
			requestDraw();

			if (!hoveredPoint && !hoveredSmallPoint) {
				setHoverCard(null);
				setHoverSmallPoint(null);
				return;
			}

			if (hoveredSmallPoint) {
				const labelWidth = 180;
				const labelHeight = 38;
				const margin = 12;
				const maxX = Math.max(margin, canvas.clientWidth - labelWidth - margin);
				const maxY = Math.max(margin, canvas.clientHeight - labelHeight - margin);

				setHoverCard(null);
				setHoverSmallPoint({
					entry: hoveredSmallPoint,
					positionX: Math.min(maxX, event.offsetX + 14),
					positionY: Math.min(maxY, event.offsetY + 12),
				});
				return;
			}

			const cardWidth = 250;
			const cardHeight = 164;
			const margin = 14;
			const maxX = Math.max(margin, canvas.clientWidth - cardWidth - margin);
			const maxY = Math.max(margin, canvas.clientHeight - cardHeight - margin);

			if (!hoveredPoint) {
				return;
			}

			setHoverSmallPoint(null);

			setHoverCard({
				entry: hoveredPoint,
				positionX: Math.min(maxX, event.offsetX + 18),
				positionY: Math.min(maxY, event.offsetY + 18),
			});
		};

		const handleMouseLeave = () => {
			hoveredPointIdRef.current = null;
			hoveredSmallPointIdRef.current = null;
			setHoverCard(null);
			setHoverSmallPoint(null);
			if (isCoordinatePickerEnabled) {
				setDevCursorCoordinates(null);
			}
			requestDraw();
		};

		const parseMap = async () => {
			const response = await fetch(WORLD_MAP_ASSET);
			const svgText = await response.text();
			const parsed = new DOMParser().parseFromString(svgText, "image/svg+xml");
			const svg = parsed.querySelector("svg");

			if (!svg) {
				return;
			}

			const viewBoxRaw = svg.getAttribute("viewBox") ?? "0 0 1000 500";
			const viewBoxValues = viewBoxRaw
				.split(/\s+/)
				.map((value) => Number.parseFloat(value));

			const viewBoxWidth = viewBoxValues[2] || 1000;
			const viewBoxHeight = viewBoxValues[3] || 500;
			const viewBoxMinX = viewBoxValues[0] || 0;
			const viewBoxMinY = viewBoxValues[1] || 0;

			const getCountryId = (element: Element) => {
				const ownId = (element.getAttribute("id") || "").trim();
				if (ownId) {
					return ownId.toLowerCase();
				}

				let parent = element.parentElement;
				while (parent) {
					const parentId = (parent.getAttribute("id") || "").trim();
					if (parentId) {
						return parentId.toLowerCase();
					}
					parent = parent.parentElement;
				}

				return "";
			};

			const paths = Array.from(parsed.querySelectorAll("path"))
				.map((element) => {
					const countryId = getCountryId(element);
					const data = element.getAttribute("d") || "";
					if (!countryId || !data) {
						return null;
					}

					return {
						countryId,
						shape: new Path2D(data),
					};
				})
				.filter((value): value is SvgCountryPath => value !== null);

			mapRef.current = {
				paths,
				viewBoxMinX,
				viewBoxMinY,
				viewBoxWidth,
				viewBoxHeight,
			};

			requestDraw();
		};

		const resizeObserver = new ResizeObserver(requestDraw);
		resizeObserver.observe(canvas);
		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("mouseleave", handleMouseLeave);

		parseMap().catch(() => {
			mapRef.current = null;
			requestDraw();
		});

		requestDraw();

		return () => {
			cancelAnimationFrame(frameId);
			resizeObserver.disconnect();
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("mouseleave", handleMouseLeave);
		};
	}, [mapPoints, mapSmallPoints, visitedCountryIds]);

	return (
		<div className="worldMapCanvasWrap">
			<canvas
				ref={canvasRef}
				className={[
					"worldMapCanvas",
					travelMapDevConfig.enableCoordinatePicker ? "worldMapCanvasDev" : "",
					className,
				]
					.filter(Boolean)
					.join(" ")}
				aria-label="World map canvas"
				role="img"
			/>
			{hoverCard ? (
				<aside
					className="worldMapHoverCard"
					style={{ left: hoverCard.positionX, top: hoverCard.positionY }}
				>
					<h4 className="worldMapHoverCardTitle">{hoverCard.entry.title}</h4>
					<img
						className="worldMapHoverCardImage"
						src={hoverCard.entry.imageSrc}
						alt={hoverCard.entry.imageAlt ?? hoverCard.entry.title ?? "Travel memory"}
					/>
					<p className="worldMapHoverCardText">{hoverCard.entry.note}</p>
				</aside>
			) : null}
			{hoverSmallPoint ? (
				<aside
					className="worldMapSmallPointTooltip"
					style={{ left: hoverSmallPoint.positionX, top: hoverSmallPoint.positionY }}
				>
					{hoverSmallPoint.entry.label}
				</aside>
			) : null}
			{travelMapDevConfig.enableCoordinatePicker && devCursorCoordinates ? (
				<aside className="worldMapDevCoords">
					{devCursorCoordinates.insideMap
						? `x: ${Math.round(devCursorCoordinates.mapX)}, y: ${Math.round(devCursorCoordinates.mapY)}`
						: "Outside map bounds"}
				</aside>
			) : null}
		</div>
	);
}
