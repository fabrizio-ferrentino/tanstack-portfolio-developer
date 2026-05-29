import { Link } from "@tanstack/react-router";
import type { Work } from "@/lib/works";

export function WorkCard({ work }: { work: Work }) {
  const overlay = work.overlay ?? 0.4;
  return (
    <Link
      to="/works/$slug"
      params={{ slug: work.slug }}
      className="group relative block aspect-[4/5] overflow-hidden rounded-md shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_22px_50px_-16px_rgba(0,0,0,0.4)]"
    >
      {/* Background image — slow zoom on hover */}
      <img
        src={work.image}
        alt=""
        loading="lazy"
        width={800}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
      />

      {/* Base gradient — keeps title readable at the bottom by default */}
      <div
        className="absolute inset-0 transition-opacity duration-500 ease-out group-hover:opacity-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,${overlay + 0.3}) 100%)`,
        }}
        aria-hidden
      />

      {/* Hover overlay — full dark veil that fades in to reveal description */}
      <div
        className="absolute inset-0 bg-black/65 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
        aria-hidden
      />

      {/* Subtle grain */}
      <span className="grain absolute inset-0 opacity-60" aria-hidden />

      {/* Content */}
      <div className="relative flex h-full flex-col justify-end p-6 text-white">
        <h3 className="font-display text-2xl sm:text-[1.7rem] leading-[1.05] tracking-tight transition-transform duration-500 ease-out group-hover:-translate-y-1">
          {work.title}
        </h3>
        <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/90 opacity-0 transition-all duration-500 ease-out group-hover:max-h-40 group-hover:opacity-100">
          {work.description}
        </p>
      </div>
    </Link>
  );
}
