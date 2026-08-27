"use client";

import { useState, type ReactNode } from "react";
import { Badge, Chip, ProgressBar, Tabs } from "./components/data-display";
import { Button } from "./components/button";
import { Checkbox, Input, Radio, Select } from "./components/form";
import { CourseCard, SearchResultCard } from "./components/cards";
import { Logo } from "./components/logo";
import { SearchBar } from "./components/search-bar";
import { SidebarNav, TopNav } from "./components/nav";
import { EmptyState, VideoPlayer } from "./components/video";
import {
  ArrowRightIcon,
  BellIcon,
  BookIcon,
  BookmarkIcon,
  ChartIcon,
  CheckIcon,
  CloseIcon,
  FocusIcon,
  LayersIcon,
  ListIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  StarIcon,
  TargetIcon,
  UsersIcon,
  ZapIcon,
} from "./components/icons";

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="text-caption font-semibold uppercase tracking-[0.18em] text-muted">
      {children}
    </h2>
  );
}

function Panel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <SectionLabel>{label}</SectionLabel>
      {children}
    </section>
  );
}

function Swatch({
  hex,
  label,
  name,
}: {
  hex: string;
  label?: string;
  name?: string;
}) {
  const isLight = hex.startsWith("#F") || hex === "#F5F5F1" || hex === "#F5E6C8";
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="flex h-14 items-end rounded-lg border border-white/5 p-2"
        style={{ backgroundColor: hex }}
      >
        <span
          className={`text-caption font-semibold ${
            isLight ? "text-ink" : "text-paper"
          }`}
        >
          {label ?? hex}
        </span>
      </div>
      <span className="text-caption text-muted">{hex}</span>
      {name ? (
        <span className="-mt-2 text-caption text-muted">{name}</span>
      ) : null}
    </div>
  );
}

function TypeSample({
  name,
  spec,
  sample,
}: {
  name: string;
  spec: string;
  sample: string;
}) {
  const textClass: Record<string, string> = {
    "Display 1": "text-display-1",
    "Display 2": "text-display-2",
    "Heading 1": "text-h1",
    "Heading 2": "text-h2",
    "Heading 3": "text-h3",
    "Body Large": "text-body-lg",
    "Body Medium": "text-body",
    "Body Small": "text-body-sm",
    Caption: "text-caption",
  };
  return (
    <div className="flex flex-col gap-1 border-b border-edge/60 pb-3 last:border-0">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-body-sm font-medium text-paper">{name}</span>
        <span className="text-caption text-muted">{spec}</span>
      </div>
      <span className={textClass[name]}>{sample}</span>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("progress");
  const [chips, setChips] = useState([
    { id: "next", label: "Next.js", count: 9 },
    { id: "react", label: "React", count: 8 },
    { id: "ts", label: "TypeScript", count: 7 },
  ]);

  return (
    <div className="min-h-full bg-ink text-paper">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-x-10 gap-y-14 px-6 py-12 lg:grid-cols-12 md:gap-y-16 md:px-10 xl:px-14">
        {/* Left column — brand */}
        <div className="flex flex-col gap-12 lg:col-span-3">
          <header className="flex flex-col gap-6">
            <Logo size="md" />
            <div className="flex flex-col gap-3">
              <h1 className="text-display-2 leading-[1.15] text-paper">
                LEARN ANYTHING.{" "}
                <span className="text-primary">FIND EXACTLY WHAT YOU NEED.</span>
              </h1>
              <p className="text-body-lg leading-7 text-muted">
                Somesha is a learning platform where you can search in plain
                language and jump directly to the exact second where the answer
                is taught.
              </p>
            </div>
          </header>

          <Panel label="Brand Values">
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: <ZapIcon width={18} height={18} className="text-primary" />,
                  title: "Instant Answers",
                  body: "Get to the exact moment you need.",
                },
                {
                  icon: <FocusIcon width={18} height={18} className="text-primary" />,
                  title: "Clarity",
                  body: "Clear content, clear experience.",
                },
                {
                  icon: <TargetIcon width={18} height={18} className="text-primary" />,
                  title: "Focus",
                  body: "Distraction-free learning.",
                },
                {
                  icon: <ChartIcon width={18} height={18} className="text-primary" />,
                  title: "Progress",
                  body: "Learn, track, grow.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-edge bg-ink-soft text-primary">
                    {item.icon}
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-body font-semibold text-paper">
                      {item.title}
                    </span>
                    <span className="text-body-sm text-muted">{item.body}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel label="Buttons">
            <div className="flex flex-col items-start gap-3">
              <Button size="md" onClick={() => {}}>
                Continue Learning
                <ArrowRightIcon width={16} height={16} />
              </Button>
              <Button variant="secondary" size="md" onClick={() => {}}>
                <PlusIcon width={16} height={16} />
                Add to My Learning
              </Button>
              <Button variant="tertiary" size="md" onClick={() => {}}>
                View Course
              </Button>
              <div className="mt-2 flex items-center gap-3">
                {[SearchIcon, BookmarkIcon, BellIcon, SettingsIcon].map(
                  (Icon, index) => (
                    <Button key={index} variant="icon" size="md" aria-label="Icon button">
                      <Icon width={20} height={20} />
                    </Button>
                  )
                )}
              </div>
            </div>
          </Panel>

          <Panel label="Iconography">
            <div className="grid grid-cols-6 gap-3 rounded-2xl border border-edge bg-ink-soft p-4">
              {[
                SearchIcon,
                ZapIcon,
                TargetIcon,
                LayersIcon,
                ListIcon,
                StarIcon,
                UsersIcon,
                BookIcon,
                BookmarkIcon,
                SettingsIcon,
                ChartIcon,
                CheckIcon,
              ].map((Icon, index) => (
                <span
                  key={index}
                  className="flex size-10 items-center justify-center rounded-lg border border-edge bg-ink text-muted transition-colors hover:text-primary"
                >
                  <Icon width={18} height={18} />
                </span>
              ))}
            </div>
            <p className="text-caption text-muted">
              Style: Line · Stroke: 2px · Corner: Rounded
            </p>
          </Panel>
        </div>

        {/* Middle column — foundations + patterns */}
        <div className="flex flex-col gap-12 lg:col-span-5">
          <Panel label="Color Palette">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-4 gap-3">
                <Swatch hex="#F0B429" name="Primary" />
                <Swatch hex="#2ECC71" name="Accent" />
                <Swatch hex="#0E0A47" name="Navy" />
                <Swatch hex="#F5E6C8" name="Cream" />
              </div>
              <div>
                <span className="mb-2 block text-caption font-medium uppercase tracking-wider text-muted">
                  Neutrals
                </span>
                <div className="grid grid-cols-7 gap-2">
                  {["#0D0F0E", "#1A1C1A", "#232523", "#2F312F", "#3C3E3C", "#5A5A5A", "#F5F5F1"].map(
                    (hex) => (
                      <Swatch key={hex} hex={hex} />
                    )
                  )}
                </div>
              </div>
              <div>
                <span className="mb-2 block text-caption font-medium uppercase tracking-wider text-muted">
                  Semantic
                </span>
                <div className="grid grid-cols-5 gap-2">
                  <Swatch hex="#27AE60" label="Success" />
                  <Swatch hex="#F1C40C" label="Warning" />
                  <Swatch hex="#E74C3C" label="Error" />
                  <Swatch hex="#3498DB" label="Info" />
                  <Swatch hex="#9B59B6" label="Purple" />
                </div>
              </div>
            </div>
          </Panel>

          <Panel label="Typography">
            <div className="rounded-2xl border border-edge bg-ink-soft p-5">
              <p className="mb-4 text-body-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Poppins
              </p>
              <div className="flex flex-col gap-4">
                <TypeSample name="Display 1" spec="56/64 · Bold" sample="Jump to the answer" />
                <TypeSample name="Display 2" spec="40/48 · Bold" sample="Learn anything." />
                <TypeSample name="Heading 1" spec="32/40 · SemiBold" sample="Continue learning" />
                <TypeSample name="Heading 2" spec="24/32 · SemiBold" sample="Search results" />
                <TypeSample name="Heading 3" spec="20/28 · Medium" sample="Authentication in NextAuth.js" />
                <TypeSample name="Body Large" spec="16/24 · Regular" sample="Search in plain language and jump straight to the answer." />
                <TypeSample name="Body Medium" spec="14/20 · Regular" sample="Save my progress automatically" />
                <TypeSample name="Body Small" spec="12/16 · Regular" sample="23 lessons · 6h24m" />
                <TypeSample name="Caption" spec="11/14 · Medium" sample="04:12 / 15:42" />
              </div>
            </div>
          </Panel>

          <Panel label="Inputs & Forms">
            <div className="flex flex-col gap-5 rounded-2xl border border-edge bg-ink-soft p-5">
              <Input
                id="email"
                label="Text Input"
                placeholder="you@example.com"
                type="email"
              />
              <Select label="Select" id="level" defaultValue="all">
                <option value="all">All Courses</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </Select>
              <Checkbox label="Save my progress automatically" name="progress" />
              <div className="flex flex-col gap-2.5">
                <Radio
                  name="access"
                  defaultChecked
                  label="Full access to all courses"
                />
                <Radio name="access" label="Limited access" />
              </div>
            </div>
          </Panel>

          <Panel label="Card Examples">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <CourseCard
                title="Next.js 14 From Zero to Hero"
                meta="23 lessons · 6h24m"
                instructor="Lee Robinson"
                rating="4.8"
              />
              <SearchResultCard
                title="Authentication in NextAuth.js"
                course="Next.js 14 From Zero to Hero"
                description="In this lesson we implement authentication using NextAuth.js credentials provider…"
                lessonLabel="Lesson 2 · 04:12"
                match="98% match"
              />
            </div>
          </Panel>

          <Panel label="Video Player UI">
            <VideoPlayer />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex flex-col gap-3 rounded-2xl border border-edge bg-ink-soft p-5">
                <span className="flex items-center gap-2 text-body-sm font-semibold text-paper">
                  <ListIcon width={16} height={16} className="text-primary" />
                  Chapters
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["Intro", "Why NextAuth.js?", "Installation", "Configuration", "Credentials Provider"].map(
                    (label) => (
                      <span
                        key={label}
                        className="rounded-full border border-edge bg-ink px-2.5 py-1 text-caption text-muted"
                      >
                        {label}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl border border-edge bg-ink-soft p-5">
                <span className="flex items-center gap-2 text-body-sm font-semibold text-paper">
                  <LayersIcon width={16} height={16} className="text-primary" />
                  Timeline
                </span>
                <span className="text-body text-muted">04:12 / 15:42</span>
                <ProgressBar value={26} showLabel={false} />
              </div>
            </div>
          </Panel>
        </div>

        {/* Right column — components */}
        <div className="flex flex-col gap-12 lg:col-span-4">
          <Panel label="Components">
            <div className="flex flex-col gap-6">
              <SearchBar
                placeholder="e.g. how does authentication work in next.js?"
                aria-label="Search"
              />
              <div>
                <span className="mb-2 block text-caption font-medium uppercase tracking-wider text-muted">
                  Chips / Tags
                </span>
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <Chip
                      key={chip.id}
                      label={chip.label}
                      count={chip.count}
                      onRemove={() =>
                        setChips((prev) => prev.filter((c) => c.id !== chip.id))
                      }
                    />
                  ))}
                </div>
              </div>
              <div>
                <span className="mb-2 block text-caption font-medium uppercase tracking-wider text-muted">
                  Badges
                </span>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="green">Beginner</Badge>
                  <Badge tone="amber">Intermediate</Badge>
                  <Badge tone="purple">Advanced</Badge>
                  <Badge tone="blue">New</Badge>
                </div>
              </div>
              <div>
                <span className="mb-2 block text-caption font-medium uppercase tracking-wider text-muted">
                  Progress Bar
                </span>
                <ProgressBar value={65} />
              </div>
              <div>
                <span className="mb-2 block text-caption font-medium uppercase tracking-wider text-muted">
                  Tabs
                </span>
                <Tabs
                  items={[
                    { id: "progress", label: "In Progress" },
                    { id: "completed", label: "Completed" },
                    { id: "wishlist", label: "Wishlist" },
                  ]}
                  active={activeTab}
                  onChange={setActiveTab}
                />
              </div>
            </div>
          </Panel>

          <Panel label="Navigation">
            <div className="flex flex-col gap-5">
              <div>
                <span className="mb-2 block text-caption font-medium uppercase tracking-wider text-muted">
                  Top Navigation
                </span>
                <TopNav />
              </div>
              <div>
                <span className="mb-2 block text-caption font-medium uppercase tracking-wider text-muted">
                  Sidebar Navigation
                </span>
                <SidebarNav />
              </div>
            </div>
          </Panel>

          <Panel label="Empty States">
            <div className="flex flex-col gap-4">
              <EmptyState
                icon={<SearchIcon width={22} height={22} />}
                title="No results found"
                description="Try different keywords, check your spelling."
                action={
                  <Button variant="secondary" size="sm" onClick={() => {}}>
                    <CloseIcon width={14} height={14} />
                    Clear filters
                  </Button>
                }
              />
              <EmptyState
                icon={<BookIcon width={22} height={22} />}
                title="No courses yet"
                description="Start learning by exploring our course catalog."
                action={
                  <Button size="sm" onClick={() => {}}>
                    Browse courses
                  </Button>
                }
              />
            </div>
          </Panel>
        </div>
      </div>

      <footer className="mx-auto flex w-full max-w-[1600px] flex-col items-center gap-2 border-t border-edge px-6 py-8 md:flex-row md:justify-between md:px-10 xl:px-14">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <span className="text-caption text-muted">Design System 1.0 · May 2024</span>
        </div>
        <p className="text-caption text-muted">
          Built with Next.js, Sanity, Clerk, PostHog and the Vercel AI SDK
        </p>
      </footer>
    </div>
  );
}
