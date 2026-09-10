import { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
  slug?: string;
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
  const hasSlug = props.slug && props.slug.length > 0;

  const content = (
    <>
      {(hasExternalLink || hasSlug) && (
        <div className="work-link">
          <MdArrowOutward />
        </div>
      )}
      <img src={props.image} alt={props.alt} loading="lazy" />
      {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
    </>
  );

  // Internal link (project case study)
  if (hasSlug) {
    return (
      <div className="work-image">
        <Link
          className="work-image-in"
          to={`/projects/${props.slug}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsVideo(false)}
          data-cursor={"disable"}
        >
          {content}
        </Link>
      </div>
    );
  }

  // External link
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
          data-cursor={"disable"}
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
        data-cursor={"disable"}
      >
        {content}
      </div>
    </div>
  );
};

export default WorkImage;
