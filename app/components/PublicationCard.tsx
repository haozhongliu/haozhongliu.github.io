import Image from "next/image";
import { Publication } from "../modules/research";

export function PublicationCard({ pub }: { pub: Publication }) {
  const venueHref = pub.venueUrl && pub.venueUrl.trim() ? pub.venueUrl : null;
  const titleHref = pub.url && pub.url.trim() ? pub.url : null;
  const doiHref = pub.doi && pub.doi.trim() ? `https://doi.org/${pub.doi}` : null;
  const pdfHref = pub.pdf && pub.pdf.trim() ? pub.pdf : null;
  const venueText = typeof pub.year === "number" ? `${pub.venue}, ${pub.year}` : pub.venue;

  return (
    <div className="publicationCard">
      <div className="pubImageContainer">
        <Image
          src={pub.image}
          alt={pub.title}
          width={240}
          height={160}
          className="pubImage"
        />
      </div>
      <div className="pubInfo">
        <h4 className="pubTitle">
          {titleHref ? (
            <a href={titleHref} target="_blank" rel="noopener noreferrer" className="pubTitleLink">
              {pub.title}
            </a>
          ) : (
            pub.title
          )}
        </h4>
        <div className="pubVenueRow">
          {venueHref ? (
            <a href={venueHref} target="_blank" rel="noopener noreferrer" className="pubVenue pubVenueLink">
              {venueText}
            </a>
          ) : (
            <div className="pubVenue">{venueText}</div>
          )}
          {pub.underReview && <span className="pubStatusBadge">Under Review</span>}
        </div>
        <div className="pubAuthors">
          {pub.authors.map((author, index) => {
            const isBold = pub.bold?.includes(author);
            const isCoFirst = pub.cofirst?.includes(author);
            return (
              <span key={author} className={isBold ? "boldAuthor" : ""}>
                {author}
                {isCoFirst && <sup className="coFirstMark">†</sup>}
                {index < pub.authors.length - 1 && ", "}
              </span>
            );
          })}
        </div>
        {pub.cofirst && pub.cofirst.length > 0 && (
          <div className="coFirstNotes">†: Equal Contribution</div>
        )}
        <div className="pubKeywords">
          {pub.keywords.map((kw) => (
            <span key={kw} className="pubKeyword">
              {kw}
            </span>
          ))}
        </div>
        <div className="pubLinks">
          {titleHref && (
            <a href={titleHref} target="_blank" rel="noopener noreferrer" className="pubLink">
              URL
            </a>
          )}
          {doiHref && (
            <a href={doiHref} target="_blank" rel="noopener noreferrer" className="pubLink">
              DOI
            </a>
          )}
          {pdfHref && (
            <a href={pdfHref} target="_blank" rel="noopener noreferrer" className="pubLink">
              PDF
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
