/**
 * Renders text with specified terms highlighted (accent color, medium weight).
 * Highlights are case-insensitive. Longest terms are matched first.
 */
export default function HighlightedText({ text, highlights }) {
  if (!highlights?.length) return <>{text}</>
  const sorted = [...highlights].sort((a, b) => b.length - a.length)
  const escaped = sorted.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi')
  const parts = text.split(regex)
  return (
    <>
      {parts.map((part, i) => {
        const isMatch = sorted.some((h) => part.toLowerCase() === h.toLowerCase())
        return isMatch ? (
          <span key={i} className="text-accentLight font-medium">
            {part}
          </span>
        ) : (
          part
        )
      })}
    </>
  )
}
