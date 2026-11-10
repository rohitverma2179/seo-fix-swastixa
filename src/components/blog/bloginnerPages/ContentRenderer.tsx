"use client";








import { Link } from "@/lib/router";

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  if (url.includes("youtube.com/embed/")) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}`
    : url;
}

export default function ContentRenderer({ block }) {
  switch (block.type) {
    case "heading":
    case "Introduction":
      return (
        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-white tracking-tight">
          {block.text}
        </h2>
      );

    case "subHeading":
      return (
        <h3 className="text-2xl md:text-3xl font-semibold mt-10 mb-5 text-white/90">
          {block.text}
        </h3>
      );

    case "subSubHeading":
      return (
        <h4 className="text-lg font-semibold mt-5 mb-2">
          {block.text}
        </h4>
      );

    case "paragraph":
      return (
        <p className="text-gray-300 mb-8 text-lg leading-relaxed md:leading-loose opacity-90">
          {renderTextWithLinks(block.text)}
        </p>
      );
    case "paragraphbold": {
      const [heading, ...rest] = block.text.split("\n");
      const bodyText = rest.join("\n");

      return (
        <p className="text-gray-300 mb-4 leading-relaxed">
          {heading && (
            <span className="block text-center font-bold text-white mb-2">
              {heading}
            </span>
          )}
          {renderTextWithLinks(bodyText)}
        </p>
      );
    }

    case "video": {
      const rawUrl = block.url || block.src;
      if (!rawUrl) return null;

      const embedUrl = getYouTubeEmbedUrl(rawUrl);
      const isYouTube = rawUrl.includes("youtube.com") || rawUrl.includes("youtu.be");

      return (
        <div className="my-10 w-full">
          {block.title && (
            <h4 className="text-xl font-semibold mb-4 text-white/90">
              {block.title}
            </h4>
          )}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            {isYouTube ? (
              <iframe
                src={embedUrl}
                title={block.title || "Video"}
                className="absolute top-0 left-0 w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <video
                src={rawUrl}
                controls
                className="w-full h-full object-cover"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      );
    }

    case "table":
      if (!block.headers || !block.rows) return null;
      return (
        <div className="overflow-x-auto my-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <table className="w-full text-left text-sm text-gray-300">
            <thead className="bg-white/10 text-white font-semibold text-base border-b border-white/10">
              <tr>
                {block.headers.map((header, idx) => (
                  <th key={idx} className="px-6 py-4">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {block.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-6 py-4">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "image": {
      const src = block.src || block.image;
      const alt = block.alt || block.imageAlt || "blog image";
      if (!src || src === "ADD_IMAGE_HERE") return null;
      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-white/10">
          <img
            loading="lazy"
            decoding="async"
            src={src}
            alt={alt}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
          />
          {alt && <p className="text-center text-sm text-gray-400 mt-2 p-2">{alt}</p>}
        </div>
      );
    }

    case "imageLeftText":
      return (
        <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
          <div className="w-full md:w-1/2 overflow-hidden rounded-xl border border-white/10">
            <img loading="lazy" decoding="async"               src={block.image}
              alt={block.alt ?? ""}
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="w-full md:w-1/2 text-gray-300 text-lg leading-relaxed">
            {renderTextWithLinks(block.text)}
          </div>
        </div>
      );

    case "imageRightText":
      return (
        <div className="flex justify-center items-center mb-12 overflow-hidden rounded-2xl border border-white/10">
          <img loading="lazy" decoding="async"             src={block.image}
            alt={block.alt ?? ""}
            className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
      );

    case "list":
      return block.variant === "ordered" ? (
        <ol className="list-decimal ml-6 text-gray-400 mb-6 space-y-2">
          {block.items.map((item, i) => (
            <li key={i}> {typeof item === "string" ? item : item.text}</li>
          ))}
        </ol>
      ) : (
        <ul className="list-disc ml-6 text-gray-400 mb-6 space-y-2">
          {block.items.map((item, i) => (
            <li key={i}> {typeof item === "string" ? item : item.text}</li>
          ))}
        </ul>
      );

    case "linkList":
      return (
        <ul className="list-disc ml-6 text-gray-400 mb-6 space-y-2">
          {block.items.map((item, i) => (
            <li key={i}>
              {renderTextWithLinks(item)}
            </li>
          ))}
        </ul>
      );

    case "boldList":
      return (
        <ul className="list-disc ml-6 text-gray-400 mb-6 space-y-2">
          {block.items.map((item, i) => (
            <li key={i}>
              <span className="font-semibold text-white">
                {item.bold}
              </span>{" "}
              {item.text}
            </li>
          ))}
        </ul>
      );
    case "boldListpara":
      return (
        <ul className="list-none list-inside   ml-0 text-gray-400 mb-6 ">
          {block.items.map((item, i) => (
            <li key={i}>
              <span className="font-semibold text-white">
                {item.bold}
              </span>{" "}
              {item.text}
            </li>
          ))}
        </ul>
      );
    case "unorderedBoldListdecimal":
      return (
        <ul className="list-decimal ml-6 text-gray-400 mb-6 space-y-2">
          {block.items.map((item, i) => (
            <li key={i}>
              <span className="font-semibold text-white">
                {item.bold}
              </span>{" "}
              {item.text}
            </li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}





// import { Link } from "@/lib/router";

function renderTextWithLinks(text) {
  if (!text) return null;

  // Step 1: split by link pattern
  const linkRegex = /\{\{link:([^|]+)\|([^}]+)\}\}/g;
  const parts = text.split(linkRegex);

  return parts.map((part, index) => {
    // Normal text OR bold handling
    if (index % 3 === 0) {
      // Handle **bold** inside normal text
      return part.split(/(\*\*.*?\*\*)/g).map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) {
          return (
            <strong key={`${index}-${i}`} className="font-semibold text-white">
              {p.replace(/\*\*/g, "")}
            </strong>
          );
        }
        return <span key={`${index}-${i}`}>{p}</span>;
      });
    }

    // Label (ignore, used with slug)
    if (index % 3 === 1) return null;

    // Slug → Link
    if (index % 3 === 2) {
      const label = parts[index - 1];
      const slug = part;

      return (
        <Link
          key={index}
          to={`/blog/${slug}`}
          className="text-blue-400 hover:underline"
        >
          {label}
        </Link>
      );
    }

    return null;
  });
}