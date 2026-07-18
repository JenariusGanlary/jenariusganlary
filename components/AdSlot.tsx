export default function AdSlot({ label = "Ad space" }: { label?: string }) {
  return (
    <div className="my-8 border border-dashed border-line rounded-lg py-6 text-center">
      <p className="text-xs font-mono text-mute">{label}</p>
    </div>
  );
}