import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
}

export default function Section({
  children,
  className = "",
  id,
  dark = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${
        dark ? "bg-primary-900 text-white" : "bg-white text-gray-900"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function SectionTitle({
  children,
  subtitle,
  center = true,
  light = false,
}: {
  children: ReactNode;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ${
          light ? "text-white" : "text-primary-900"
        }`}
      >
        {children}
      </h2>
      {subtitle && (
        <p
          className={`text-lg max-w-2xl ${center ? "mx-auto" : ""} ${
            light ? "text-primary-200" : "text-gray-600"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`w-20 h-1 bg-accent-500 mt-6 rounded-full ${
          center ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
