import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;       // external link (kept for backwards compat)
  onOpen?: () => void; // opens the in-page project viewer
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const hasExternalLink = props.link && props.link.length > 0;
  const hasOnOpen = !!props.onOpen;

  const content = (
    <>
      {(hasExternalLink || hasOnOpen) && (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      )}
      <img src={props.image} alt={props.alt} loading="lazy" />
      {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
    </>
  );

  // In-page project viewer (preferred path)
  if (hasOnOpen) {
    return (
      <div className="work-image">
        <button
          className="work-image-in"
          onClick={props.onOpen}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          data-cursor="disable"
          aria-label={`Open project: ${props.alt ?? "project"}`}
          style={{ border: 'none', background: 'transparent', padding: 0, cursor: 'pointer', display: 'block', width: '100%' }}
        >
          {content}
        </button>
      </div>
    );
  }

  // External link (fallback)
  if (hasExternalLink) {
    return (
      <div className="work-image">
        <a
          className="work-image-in"
          href={props.link}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="disable"
        >
          {content}
        </a>
      </div>
    );
  }

  return (
    <div className="work-image">
      <div
        className="work-image-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        data-cursor="disable"
      >
        {content}
      </div>
    </div>
  );
};

export default WorkImage;
