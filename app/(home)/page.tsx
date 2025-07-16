export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 h-30 flex-1 rounded-xl" />
      <div className="bg-muted/50 h-30 flex-1 rounded-xl md:min-h-min" />

      {/* Additional large skeletons to test scrolling */}
      {Array(15)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="bg-muted/50 h-60 rounded-xl my-4" />
        ))}
    </div>
  );
}
