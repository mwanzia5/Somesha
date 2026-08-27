import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-3 px-6 py-8 md:flex-row md:justify-between md:px-10 xl:px-14">
        <Link href="/" className="inline-flex items-center gap-3">
          <Logo size="sm" />
          <span className="text-caption text-muted">Somesha</span>
        </Link>
        <Link
          href="/designsystem"
          className="text-caption text-muted transition-colors hover:text-paper"
        >
          Design System 1.0
        </Link>
      </div>
    </footer>
  );
}
