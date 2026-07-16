export default function Newsletter() {
  return (
    <section className="my-16 rounded-xl border border-gray-300 bg-white p-8 md:p-10 text-center">
      <p
        className="text-xs font-semibold tracking-wider text-ledger mb-2"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        $SUBSCRIBE
      </p>
      <h2
        className="text-2xl md:text-3xl font-semibold mb-3 text-navy"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Get new posts in your inbox
      </h2>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Tech, finance, and startup notes — no spam, unsubscribe anytime.
      </p>
      <div className="max-w-md mx-auto">
        <iframe
          src="https://embeds.beehiiv.com/YOUR-PUBLICATION-ID"
          className="w-full"
          style={{ height: "120px", border: "none", background: "transparent" }}
          title="Newsletter signup"
        />
      </div>
    </section>
  );
}