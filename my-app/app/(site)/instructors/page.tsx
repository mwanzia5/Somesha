import { Badge } from "@/app/components/data-display";
import { instructors } from "@/app/lib/mock";

export default function InstructorsPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] px-6 py-10 md:px-10 xl:px-14">
      <div className="mb-8 flex flex-col gap-1">
        <h1 className="text-h1 text-paper">Instructors</h1>
        <p className="text-body text-muted">
          Learn from engineers and educators building in the open.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {instructors.map((instructor) => (
          <article
            key={instructor.name}
            className="flex flex-col gap-4 rounded-2xl border border-edge bg-ink-soft p-6 transition-colors hover:border-muted"
          >
            <div className="flex items-center gap-4">
              <span className="flex size-14 items-center justify-center rounded-full bg-surface-strong text-h3 font-semibold text-cream">
                {instructor.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-h3 text-paper">{instructor.name}</span>
                <span className="text-body-sm text-muted">
                  {instructor.role}
                </span>
              </div>
            </div>
            <p className="text-body-sm leading-6 text-muted">
              {instructor.bio}
            </p>
            <div className="mt-auto flex items-center justify-between border-t border-edge pt-4">
              <div className="flex flex-wrap gap-2">
                <Badge tone="muted">{instructor.courses} courses</Badge>
                <Badge tone="blue">{instructor.students} students</Badge>
              </div>
              <span className="text-body-sm font-medium text-cream">
                ★ {instructor.rating}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
