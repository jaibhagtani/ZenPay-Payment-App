import { type ReactNode } from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="w-full">
      <h1 className="font-bold text-xl p-4 border-b pb-2">
        {title}
      </h1>
      <div>
        {children}
      </div>
    </div>
  );
}
