import { TopNav } from "./nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-ink/90 backdrop-blur">
      <div className="mx-auto w-full max-w-[1600px] px-6 py-3 md:px-10 xl:px-14">
        <TopNav />
      </div>
    </header>
  );
}
