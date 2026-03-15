"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "dark";
  children: React.ReactNode;
}

export function Button({ variant = "primary", children, className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 h-12 rounded-[var(--radius-md)] font-[family-name:var(--font-mona)] font-semibold text-base cursor-pointer transition-all duration-200 ease-out whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2";

  const variants = {
    primary: "bg-[var(--color-primary)] text-white px-6 hover:brightness-90 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
    ghost: "bg-transparent border-2 border-[var(--color-back-border)] text-[var(--color-body)] px-6 hover:bg-[var(--color-border)]",
    dark: "bg-[var(--color-primary-dark)] text-white px-4 hover:brightness-110",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
