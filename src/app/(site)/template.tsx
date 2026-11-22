import { ViewTransition } from "react";

// Templates remount on every navigation, so enter/exit fire here (a layout would persist).
// Untyped updates (search params, Suspense reveals) stay still: default="none".
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}
