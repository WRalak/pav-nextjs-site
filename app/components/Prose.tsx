/**
 * Renders admin-editable prose: paragraphs are separated by a blank line;
 * a paragraph starting with "> " is rendered in the pull-quote style.
 */
export function Prose({
  text,
  className,
  quoteClassName,
}: {
  text: string;
  className?: string;
  quoteClassName?: string;
}) {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      {paragraphs.map((p, i) => {
        if (p.startsWith(">")) {
          return (
            <p key={i} className={quoteClassName ?? className}>
              {p.replace(/^>\s*/, "")}
            </p>
          );
        }
        return (
          <p key={i} className={className}>
            {p}
          </p>
        );
      })}
    </>
  );
}
