import { BottomNav } from "../navigation/BottomNav";
import { useLocation } from "react-router-dom";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const { pathname } = useLocation();

  const theme =
    pathname.startsWith("/plan")
      ? "theme-plan"
      : pathname.startsWith("/chrono")
        ? "theme-chrono"
        : pathname.startsWith("/routines") ||
            pathname.startsWith("/shopping-list")
          ? "theme-routines"
          : pathname.startsWith("/notes")
            ? "theme-notes"
            : pathname.startsWith("/communication")
              ? "theme-communication"
              : "theme-home";

  const hideNavigation =
  pathname === "/onboarding" ||
  pathname.startsWith("/register") ||
  pathname.startsWith("/login") ||
  pathname.startsWith("/verify-email");

return (
  <div className={`app-shell ${theme}`}>
    <main className="app-main">{children}</main>

    {!hideNavigation && <BottomNav />}
  </div>
);
}
