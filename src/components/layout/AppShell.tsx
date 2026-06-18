import { BottomNav } from "../navigation/BottomNav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <main className="app-main">{children}</main>
      <BottomNav />
    </div>
  );
}