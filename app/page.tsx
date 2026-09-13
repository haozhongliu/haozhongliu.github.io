"use client";

import Image from "next/image";
import { type ReactNode, useState } from "react";

import { WorldMapCanvas } from "./components/WorldMapCanvas";
import { PublicationCard } from "./components/PublicationCard";
import { ProjectCard } from "./components/ProjectCard";
import { SocialIconLinks } from "./components/SocialIconLinks";
import { aboutModule, aboutHighlightTerms } from "./modules/about";
import { experienceModule } from "./modules/experience";
import { journeysModule, writingHighlightTerms } from "./modules/journeys";
import {
	researchInterestCards,
	researchModule,
	researchHighlightTerms,
	publications,
	projects,
} from "./modules/research";

const highlightTermSet = new Set(aboutHighlightTerms);
const writingHighlightTermSet = new Set(writingHighlightTerms);
const researchHighlightTermSet = new Set(researchHighlightTerms);

function escapeRegExp(value: string) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderHighlightedText(
	text: string,
	highlightTerms: readonly string[],
	highlightSet: Set<string>,
	keyPrefix: string,
) {
	if (highlightTerms.length === 0) return [text] as Array<string | ReactNode>;

	const sortedTerms = [...highlightTerms].sort((a, b) => b.length - a.length);
	const matcher = new RegExp(`(${sortedTerms.map(escapeRegExp).join("|")})`, "g");

	return text.split(matcher).map((segment, index) => {
		if (highlightSet.has(segment)) {
			return (
				<span key={`${keyPrefix}-highlight-${index}`} className="aboutHighlight">
					{segment}
				</span>
			);
		}

		return segment;
	});
}

function renderHighlightedRichText(
	text: string,
	highlightTerms: readonly string[],
	highlightSet: Set<string>,
	keyPrefix: string,
) {
	const linkMatcher = /\[([^\]]+)\]\(([^)\s]+)\)/g;
	const output: Array<string | ReactNode> = [];
	let cursor = 0;
	let match: RegExpExecArray | null;
	let linkIndex = 0;

	while ((match = linkMatcher.exec(text)) !== null) {
		const [fullMatch, label, href] = match;
		const startIndex = match.index;

		if (startIndex > cursor) {
			output.push(
				...renderHighlightedText(
					text.slice(cursor, startIndex),
					highlightTerms,
					highlightSet,
					`${keyPrefix}-plain-${linkIndex}`,
				),
			);
		}

		const isExternal = href.startsWith("http://") || href.startsWith("https://");
		output.push(
			<a
				key={`${keyPrefix}-link-${linkIndex}`}
				href={href}
				className="inlineTextLink"
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noopener noreferrer" : undefined}
			>
				{renderHighlightedText(label, highlightTerms, highlightSet, `${keyPrefix}-label-${linkIndex}`)}
			</a>,
		);

		cursor = startIndex + fullMatch.length;
		linkIndex += 1;
	}

	if (cursor < text.length) {
		output.push(
			...renderHighlightedText(
				text.slice(cursor),
				highlightTerms,
				highlightSet,
				`${keyPrefix}-tail`,
			),
		);
	}

	return output;
}

function highlightAboutText(text: string) {
	return renderHighlightedRichText(text, aboutHighlightTerms, highlightTermSet, "about");
}

function highlightWritingText(text: string) {
	return renderHighlightedRichText(text, writingHighlightTerms, writingHighlightTermSet, "writing");
}

function highlightResearchText(text: string) {
	return renderHighlightedRichText(text, researchHighlightTerms, researchHighlightTermSet, "research");
}

const sections = [
	{ id: aboutModule.id, index: aboutModule.index, label: aboutModule.title },
	{ id: researchModule.id, index: researchModule.index, label: researchModule.title },
	{ id: experienceModule.id, index: experienceModule.index, label: experienceModule.title },
	{ id: journeysModule.id, index: journeysModule.index, label: journeysModule.title },
] as const;

export default function Home() {
	const [activeResearch, setActiveResearch] = useState(researchModule.blocks[0].id);
	const [activeExperience, setActiveExperience] = useState(experienceModule.blocks[0].id);
	const [activeJourneys, setActiveJourneys] = useState(journeysModule.blocks[0].id);
	const aboutImageSrc = `${aboutModule.image.src}?v=20260517`;

	const activeResearchBlock =
		researchModule.blocks.find((block) => block.id === activeResearch) ?? researchModule.blocks[0];

	const activeExperienceBlock =
		experienceModule.blocks.find((block) => block.id === activeExperience) ?? experienceModule.blocks[0];

	const activeJourneysBlock =
		journeysModule.blocks.find((block) => block.id === activeJourneys) ?? journeysModule.blocks[0];

	return (
		<main className="homepageShell">
				<aside className="researchRail" aria-label="Document map">
					<ol className="railList">
						{sections.map((section) => (
							<li key={section.id} className="railItem">
								<a href={`#${section.id}`} className="railLink">
									<span className="railIndex">{section.index}</span>
									<span className="railLabel">{section.label}</span>
								</a>
							</li>
						))}
					</ol>
				</aside>

				<div className="documentFlow">
					<section id={aboutModule.id} className="moduleSection moduleAbout">
						<div className="moduleHeading">
							<p className="sectionIndex">{aboutModule.index}</p>
							<h1 className="sectionTitle">{aboutModule.title}</h1>
						</div>
						<div className="aboutSplit">
							<div className="aboutCopy">
								{aboutModule.paragraphs.map((paragraph, index) => (
									<p
										key={index}
										className={`bodyText aboutParagraph ${index === 0 ? "aboutLead" : ""}`.trim()}
									>
										{highlightAboutText(paragraph)}
									</p>
								))}
							</div>
							<div className="aboutPhotoFrame">
								<Image
									src={aboutImageSrc}
									alt={aboutModule.image.alt}
									width={520}
									height={650}
									unoptimized
									priority
									className="aboutPortrait"
								/>
								<SocialIconLinks links={aboutModule.socialLinks} />
							</div>
						</div>
					</section>

					<section id={researchModule.id} className="moduleSection">
						<div className="moduleHeading">
							<p className="sectionIndex">{researchModule.index}</p>
							<h2 className="sectionTitle">{researchModule.title}</h2>
						</div>
						<div className="moduleWorkspace">
							<div className="switchColumn" role="list" aria-label="Research categories">
								{researchModule.blocks.map((block) => (
									<button
										type="button"
										key={block.id}
										className={`switchButton ${activeResearch === block.id ? "isActive" : ""}`}
										onClick={() => setActiveResearch(block.id)}
										aria-pressed={activeResearch === block.id}
										role="listitem"
									>
										{block.label}
									</button>
								))}
							</div>
							<article className="detailSheet" aria-live="polite">
								<h3 className="detailTitle">{activeResearchBlock.title}</h3>
								{activeResearch === "publications" ? (
									<>
										<div className="publicationsList">
											{publications.map((pub, idx) => (
												<PublicationCard key={idx} pub={pub} />
											))}
										</div>
										<button
											type="button"
											className="JumpLink"
											onClick={() => setActiveResearch("projects")}
										>
											See My Projects
										</button>
									</>
								) : activeResearch === "projects" ? (
									<>
										<div className="projectsList">
											{projects.map((project, idx) => (
												<ProjectCard key={idx} project={project} />
											))}
										</div>
										<button
											type="button"
											className="JumpLink"
											onClick={() => setActiveResearch("interests")}
										>
											See My Interests
										</button>
									</>
								) : activeResearch === "interests" ? (
									<>
										<div className="interestCards" aria-label="Interest topics">
											{researchInterestCards.map((card) => (
												<span key={card} className="interestCard">
													{card}
												</span>
											))}
										</div>
										<div className="detailParagraphs">
											{activeResearchBlock.content.split("\n\n").map((paragraph, index) => (
												<p key={index} className="bodyText contentParagraph">
													{highlightResearchText(paragraph)}
												</p>
											))}
										</div>
										<button
											type="button"
											className="JumpLink"
											onClick={() => setActiveResearch("publications")}
										>
											See My Publications
										</button>
									</>
								) : (
									<p className="bodyText detailContent contentParagraph">{activeResearchBlock.content}</p>
								)}
							</article>
						</div>
					</section>

					<section id={experienceModule.id} className="moduleSection">
						<div className="moduleHeading">
							<p className="sectionIndex">{experienceModule.index}</p>
							<h2 className="sectionTitle">{experienceModule.title}</h2>
						</div>
						<div className="moduleWorkspace">
							<div className="switchColumn" role="list" aria-label="Experience categories">
								{experienceModule.blocks.map((block) => (
									<button
										type="button"
										key={block.id}
										className={`switchButton ${activeExperience === block.id ? "isActive" : ""}`}
										onClick={() => setActiveExperience(block.id)}
										aria-pressed={activeExperience === block.id}
										role="listitem"
									>
										{block.label}
									</button>
								))}
							</div>
							<article className="detailSheet" aria-live="polite">
								<h3 className="detailTitle">{activeExperienceBlock.title}</h3>
								<div className="experienceItems">
									{activeExperienceBlock.items.map((item, index) => (
										<div key={`${item.title}-${index}`} className="experienceItem">
											<p className="experienceItemTitle">{item.title}</p>
											{"description" in item && item.description ? (
												<p className="experienceItemDescription">{item.description}</p>
											) : null}
										</div>
									))}
								</div>
								{activeExperience === "honors" ? (
									<button
										type="button"
										className="JumpLink"
										onClick={() => setActiveExperience("activities")}
									>
										See My Activities
									</button>
								) : activeExperience === "activities" ? (
									<button
										type="button"
										className="JumpLink"
										onClick={() => setActiveExperience("honors")}
									>
										See My Honors
									</button>
								) : (
									<button
										type="button"
										className="JumpLink"
										onClick={() => setActiveExperience("honors")}
									>
										See My Honors
									</button>
								)}
							</article>
						</div>
					</section>

					<section id={journeysModule.id} className="moduleSection">
						<div className="moduleHeading">
							<p className="sectionIndex">{journeysModule.index}</p>
							<h2 className="sectionTitle">{journeysModule.title}</h2>
						</div>
						<div className="moduleWorkspace">
							<div className="switchColumn" role="list" aria-label="Journeys categories">
								{journeysModule.blocks.map((block) => (
									<button
										type="button"
										key={block.id}
										className={`switchButton ${activeJourneys === block.id ? "isActive" : ""}`}
										onClick={() => setActiveJourneys(block.id)}
										aria-pressed={activeJourneys === block.id}
										role="listitem"
									>
										{block.label}
									</button>
								))}
							</div>
							<article className="detailSheet" aria-live="polite">
								<h3 className="detailTitle">{activeJourneysBlock.title}</h3>
								{activeJourneys === "writing" ? (
									<>
										<div className="detailParagraphs">
											{activeJourneysBlock.content.split("\n\n").map((paragraph, index) => (
												<p key={index} className="bodyText contentParagraph">
													{highlightWritingText(paragraph)}
												</p>
											))}
										</div>
										<button
											type="button"
											className="JumpLink"
											onClick={() => setActiveJourneys("traveling")}
										>
											See My Travels
										</button>
									</>
								) : activeJourneys === "traveling" ? (
									<>
										<p className="bodyText detailContent contentParagraph">{activeJourneysBlock.content}</p>
										<WorldMapCanvas />
										<button
											type="button"
											className="JumpLink"
											onClick={() => setActiveJourneys("writing")}
										>
											See My Writing
										</button>
									</>
								) : (
									<>
										<p className="bodyText detailContent contentParagraph">{activeJourneysBlock.content}</p>
										<button
											type="button"
											className="JumpLink"
											onClick={() => setActiveJourneys("writing")}
										>
											See My Writing
										</button>
									</>
								)}
							</article>
						</div>
					</section>
				</div>
			</main>
	);
}
