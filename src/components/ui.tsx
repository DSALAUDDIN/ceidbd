import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
export function Button({
  href,
  children,
  light = false,
  outline = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  outline?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`button ${light ? "light" : ""} ${outline ? "outline" : ""}`}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
export function Photo({
  name,
  alt,
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={`/images/${name}.webp`}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 650px"
      />
    </div>
  );
}
export function PageHero({
  label,
  title,
  description,
  image,
}: {
  label: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <section className={`page-hero ${image ? "with-photo" : ""}`}>
      <div className="container page-hero-inner">
        <div>
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            {label}
          </div>
          <Eyebrow>{label}</Eyebrow>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        {image && (
          <Photo
            name={image}
            alt={`${label}: community engagement and research`}
            priority
          />
        )}
      </div>
    </section>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function Invitation() {
  return (
    <section className="invitation">
      <div className="container invitation-inner">
        <div>
          <Eyebrow>Progress begins with connection</Eyebrow>
          <h2>
            A shared purpose.
            <br />
            <em>A more inclusive future.</em>
          </h2>
        </div>
        <div>
          <p>
            Bring your questions, ideas and experience. Let’s explore what we
            can do together.
          </p>
          <Button href="/contact" light>
            Start a conversation
          </Button>
        </div>
      </div>
    </section>
  );
}
