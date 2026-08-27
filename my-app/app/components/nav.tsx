import type { ComponentType } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Logo } from "./logo";
import {
  BookIcon,
  BookmarkIcon,
  PlayIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  type IconProps,
} from "./icons";

export function TopNav({ active }: { active?: string }) {
  const links = [
    { id: "catalog", label: "Courses", href: "/catalog" },
    { id: "instructors", label: "Instructors", href: "/instructors" },
    { id: "learning", label: "My Learning", href: "/my-learning" },
  ];
  return (
    <nav className="flex w-full items-center justify-between rounded-2xl border border-edge bg-ink-soft px-5 py-3.5">
      <Link href="/" aria-label="Somesha home">
        <Logo size="sm" />
      </Link>
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`relative text-body-sm font-medium transition-colors hover:text-paper focus-visible:outline-none ${
              link.id === active
                ? "text-primary after:absolute after:-bottom-2 after:inset-x-0 after:h-0.5 after:rounded-full after:bg-primary"
                : "text-muted"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton>
            <button
              type="button"
              className="rounded-full bg-primary px-4 py-2 text-caption font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Sign in
            </button>
          </SignInButton>
          <SignUpButton>
            <button
              type="button"
              className="rounded-full border border-edge px-4 py-2 text-caption font-semibold text-paper transition-colors hover:border-primary hover:text-primary"
            >
              Sign up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </nav>
  );
}

const sidebarItems: {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  badge?: string;
}[] = [
  { id: "search", label: "Search", icon: SearchIcon, badge: "8" },
  { id: "courses", label: "Courses", icon: BookIcon },
  { id: "instructors", label: "Instructors", icon: UsersIcon },
  { id: "learning", label: "My Learning", icon: PlayIcon },
  { id: "bookmarks", label: "Bookmarks", icon: BookmarkIcon },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

export function SidebarNav({ active = "search" }: { active?: string }) {
  return (
    <nav className="flex w-full flex-col gap-1 rounded-2xl border border-edge bg-ink-soft p-3">
      <div className="mb-2 px-2 py-2">
        <Logo size="sm" />
      </div>
      {sidebarItems.map((item) => {
        const isActive = item.id === active;
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href="#"
            className={`flex items-center gap-3 rounded-xl px-3 py-2 text-body transition-colors focus-visible:outline-none ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted hover:bg-surface hover:text-paper"
            }`}
          >
            <Icon width={18} height={18} />
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
              <span className="rounded-full bg-surface-strong px-2 py-0.5 text-caption font-semibold text-primary">
                {item.badge}
              </span>
            ) : null}
          </a>
        );
      })}
    </nav>
  );
}
