import AppShell from "@/components/layout/app-shell";

export default function CreateLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
