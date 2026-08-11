import type { CaseStudy } from "@/lib/case-studies";

const STATUS_STYLES: Record<CaseStudy["status"], { dot: string; text: string }> = {
  live: { dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
  pilot: { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  building: { dot: "bg-accent", text: "text-accent" },
};

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  const statusStyle = STATUS_STYLES[study.status];

  return (
    <article className="rounded-2xl border-2 border-line bg-surface p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <h3
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {study.name}
        </h3>
        <span className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full border border-line bg-background">
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} aria-hidden="true" />
          <span className={statusStyle.text}>{study.statusLabel.toUpperCase()}</span>
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <p className="text-xs font-mono text-mute mb-2">PROBLEM</p>
          <p className="text-sm text-mute leading-relaxed">{study.problem}</p>
        </div>
        <div>
          <p className="text-xs font-mono text-mute mb-2">WHAT I BUILT</p>
          <p className="text-sm text-mute leading-relaxed">{study.build}</p>
        </div>
        <div>
          <p className="text-xs font-mono text-mute mb-2">OUTCOME</p>
          <p className="text-sm text-mute leading-relaxed">{study.outcome}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-5 border-t border-line">
        {study.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono text-foreground/80 bg-background border border-line rounded-full px-2.5 py-1"
          >
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}