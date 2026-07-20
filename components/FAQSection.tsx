import type { FaqItem } from "@/lib/posts";

export default function FAQSection({ items }: { items: FaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-line">
      <p className="text-xs font-mono text-mute mb-3">FAQ</p>
      <h2 id="frequently-asked-questions" className="text-2xl font-bold mb-6 text-foreground scroll-mt-24">
        Frequently asked questions
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.question} className="rounded-xl bg-surface border border-line p-5 md:p-6">
            <p className="font-semibold text-foreground mb-2 leading-snug">{item.question}</p>
            <p className="text-mute text-sm leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}