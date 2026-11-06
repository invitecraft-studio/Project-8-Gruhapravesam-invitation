/* A door garland of mango leaves and marigolds that sways gently. */
export default function Toran() {
  return (
    <div className="toran" aria-hidden="true">
      {Array.from({ length: 64 }, (_, i) => (
        <span key={i} className={i % 2 ? "tb" : "tl"} style={{ animationDelay: `${(i % 9) * -0.45}s` }} />
      ))}
    </div>
  );
}
