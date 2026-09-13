import { SocialLink } from "../modules/about";

export function SocialIconLinks({ links }: { links: readonly SocialLink[] }) {
  if (links.length === 0) return null;

  return (
    <div className="socialLinks" aria-label="Social and profile links">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="socialLink"
          aria-label={link.label}
          title={link.label}
        >
          <img src={link.iconSrc} alt="" className="socialIcon" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
