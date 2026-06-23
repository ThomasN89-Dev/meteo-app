function Loader() {
  return (
    <div className="flex flex-col items-center gap-4 mt-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
      <p className="text-muted-foreground text-sm">Caricamento...</p>
    </div>
  );
}

export default Loader;
