/**
 * The answer-first opener. Renders the post's direct answer in a visually
 * distinct block so both readers and AI retrieval systems find the point
 * immediately. The summary frontmatter is used as the answer text.
 */
export function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-accent/25 bg-accent/[0.04] p-6">
      <div className="mono-label text-accent">The short answer</div>
      <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-body">{children}</p>
    </div>
  );
}
