"use client";

import { useState, type ReactNode } from "react";
import { Tabs } from "./data-display";

export function LessonTabs({
  overview,
  notes,
  resources,
}: {
  overview: ReactNode;
  notes: ReactNode;
  resources: ReactNode;
}) {
  const [active, setActive] = useState("overview");
  return (
    <div>
      <Tabs
        items={[
          { id: "overview", label: "Overview" },
          { id: "notes", label: "Notes" },
          { id: "resources", label: "Resources" },
        ]}
        active={active}
        onChange={setActive}
      />
      <div className="mt-6">
        {active === "overview" && overview}
        {active === "notes" && notes}
        {active === "resources" && resources}
      </div>
    </div>
  );
}
