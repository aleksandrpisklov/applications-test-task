export function Toast({ message }: { message: string }) {
  return (
    <div className="bg-card border-border text-foreground animate-in slide-in-from-bottom-2 fixed right-6 bottom-6 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-2xl">
      <div className="bg-primary h-1.5 w-1.5 rounded-full" />
      {message}
    </div>
  );
}
