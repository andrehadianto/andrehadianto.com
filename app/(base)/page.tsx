"use client";
// eslint-disable-next-line import/named
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "@/common/components/CustomIcon";
import { Links, MY_EMAIL } from "@/common/constants/links";

type Theme = "light" | "dark" | "system";

function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
      document.documentElement.setAttribute("data-theme", stored);
    }
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    if (next === "system") {
      localStorage.removeItem("theme");
      document.documentElement.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
    }
  }, []);

  const toggle = useCallback(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(isDark ? "light" : "dark");
  }, [theme, setTheme]);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return { theme, isDark, toggle };
}

const SECTIONS = [
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
  { id: "tools", label: "Tools" },
] as const;

const CAREER_ENTRIES = [
  {
    role: "Senior Software Engineer",
    company: "Company A",
    period: "2023 - Present",
    description:
      "Led frontend architecture and built scalable web applications serving millions of users. Collaborated with cross-functional teams to deliver high-impact features.",
    tags: ["React", "TypeScript", "Next.js", "Node.js", "AWS"],
  },
  {
    role: "Software Engineer",
    company: "Company B",
    period: "2021 - 2023",
    description:
      "Developed and maintained full-stack applications with a focus on performance optimization and user experience. Implemented CI/CD pipelines and improved deployment workflows.",
    tags: ["React", "Python", "PostgreSQL", "Docker", "GraphQL"],
  },
  {
    role: "Junior Software Engineer",
    company: "Company C",
    period: "2019 - 2021",
    description:
      "Built responsive web interfaces and RESTful APIs. Contributed to design system development and component library.",
    tags: ["JavaScript", "Vue.js", "Express", "MongoDB"],
  },
];

const PROJECTS = [
  {
    name: "Project Alpha",
    description:
      "A full-stack web application for managing workflows and automating repetitive tasks. Features real-time collaboration and integrations with third-party services.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    link: "#",
  },
  {
    name: "Project Beta",
    description:
      "An open-source component library built with accessibility and performance in mind. Used by multiple teams across the organization.",
    tags: ["React", "Storybook", "Tailwind CSS"],
    link: "#",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("career");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const { isDark, toggle: toggleTheme } = useTheme();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-bg-base text-text-em-high">
      {/* Top-right CTA + Theme Toggle */}
      <div className="fixed top-0 right-0 z-10 flex items-center gap-2 p-6">
        <motion.button
          animate={{ opacity: 1, y: 0 }}
          aria-label="Toggle theme"
          className="bg-surface-elevated border-border-base text-text-em-mid hover:text-text-em-high inline-flex items-center justify-center rounded-full border p-2.5 transition-colors"
          initial={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.3 }}
          onClick={toggleTheme}
        >
          <Icon
            height={18}
            icon={isDark ? "lucide:sun" : "lucide:moon"}
            width={18}
          />
        </motion.button>
        <motion.a
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-elevated border-border-base text-text-em-mid hover:text-text-em-high inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
          href={`mailto:${MY_EMAIL}`}
          initial={{ opacity: 0, y: -10 }}
          transition={{ delay: 0.4 }}
        >
          Get in Touch
        </motion.a>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-0 px-6 py-16 lg:flex-row lg:gap-20 lg:px-12 lg:py-24">
        {/* Left Sidebar */}
        <motion.aside
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 shrink-0 lg:sticky lg:top-24 lg:mb-0 lg:h-fit lg:w-64"
          initial={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-8">
            {/* Identity */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Andre Hadianto
              </h1>
              <p className="text-text-em-mid text-base font-medium">
                Software Engineer
              </p>
            </div>

            {/* Bio */}
            <p className="text-text-em-low text-base leading-relaxed">
              Software Engineer focused on Frontend technologies with a keen eye
              for UI/UX in addition to Full Stack engineering. Experienced in
              handling production and scaling challenges across the stack.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                aria-label="GitHub"
                className="text-text-em-low hover:text-text-em-high transition-colors"
                href={Links.GITHUB}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon height={20} icon="lucide:github" width={20} />
              </a>
              <a
                aria-label="LinkedIn"
                className="text-text-em-low hover:text-text-em-high transition-colors"
                href={Links.LINKEDIN}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon height={20} icon="lucide:linkedin" width={20} />
              </a>
              <a
                aria-label="Email"
                className="text-text-em-low hover:text-text-em-high transition-colors"
                href={`mailto:${MY_EMAIL}`}
              >
                <Icon height={20} icon="lucide:mail" width={20} />
              </a>
            </div>

            {/* Table of Contents */}
            <nav className="hidden lg:block">
              <ul className="flex flex-col gap-1">
                {SECTIONS.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      className={`group flex items-center gap-3 py-1.5 text-sm font-medium uppercase tracking-widest transition-colors ${
                        activeSection === id
                          ? "text-text-em-high"
                          : "text-text-em-low hover:text-text-em-mid"
                      }`}
                      onClick={() => scrollTo(id)}
                    >
                      <span
                        className={`h-px transition-all ${
                          activeSection === id
                            ? "bg-text-em-high w-12"
                            : "bg-text-em-low group-hover:bg-text-em-mid w-6 group-hover:w-8"
                        }`}
                      />
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.aside>

        {/* Right Content */}
        <motion.main
          animate={{ opacity: 1, y: 0 }}
          className="flex min-w-0 flex-1 flex-col gap-20"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Career Journey */}
          <section
            ref={(el) => {
              sectionRefs.current.career = el;
            }}
            id="career"
          >
            <h2 className="text-text-em-low mb-8 text-sm font-medium uppercase tracking-widest">
              Career Journey
            </h2>
            <div className="flex flex-col gap-10">
              {CAREER_ENTRIES.map((entry, i) => (
                <motion.article
                  key={i}
                  className="group"
                  initial={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold">{entry.role}</h3>
                      <p className="text-text-em-mid text-base">
                        {entry.company}{" "}
                        <span className="text-text-em-low">
                          &middot; {entry.period}
                        </span>
                      </p>
                    </div>
                    <p className="text-text-em-low text-base leading-relaxed">
                      {entry.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-surface-elevated text-text-em-mid rounded-full px-3 py-1 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section
            ref={(el) => {
              sectionRefs.current.projects = el;
            }}
            id="projects"
          >
            <h2 className="text-text-em-low mb-8 text-sm font-medium uppercase tracking-widest">
              Projects
            </h2>
            <div className="flex flex-col gap-8">
              {PROJECTS.map((project, i) => (
                <motion.article
                  key={i}
                  className="group"
                  initial={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-text-em-low text-base leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-surface-elevated text-text-em-mid rounded-full px-3 py-1 text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section
            ref={(el) => {
              sectionRefs.current.contact = el;
            }}
            id="contact"
          >
            <h2 className="text-text-em-low mb-8 text-sm font-medium uppercase tracking-widest">
              Contact
            </h2>
            <div className="flex flex-col gap-4">
              <p className="text-text-em-low text-base leading-relaxed">
                Feel free to reach out if you&apos;d like to collaborate, have a
                question, or just want to connect.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  className="text-text-em-mid hover:text-text-em-high inline-flex items-center gap-2 text-base transition-colors"
                  href={`mailto:${MY_EMAIL}`}
                >
                  <Icon height={16} icon="lucide:mail" width={16} />
                  {MY_EMAIL}
                </a>
                <a
                  className="text-text-em-mid hover:text-text-em-high inline-flex items-center gap-2 text-base transition-colors"
                  href={Links.GITHUB}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon height={16} icon="lucide:github" width={16} />
                  github.com/andrehadianto
                </a>
                <a
                  className="text-text-em-mid hover:text-text-em-high inline-flex items-center gap-2 text-base transition-colors"
                  href={Links.LINKEDIN}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon height={16} icon="lucide:linkedin" width={16} />
                  linkedin.com/in/andre-hadianto
                </a>
              </div>
            </div>
          </section>

          {/* Tools */}
          <section
            ref={(el) => {
              sectionRefs.current.tools = el;
            }}
            id="tools"
          >
            <h2 className="text-text-em-low mb-8 text-sm font-medium uppercase tracking-widest">
              Tools
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                className="border-border-base hover:bg-surface-elevated group flex flex-col gap-3 rounded-lg border p-4 transition-colors"
                href="/sticker-map"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                  <Image
                    fill
                    unoptimized
                    alt="sticker-map tool"
                    className="object-cover"
                    src="https://andrehadianto.github.io/andrehadianto.com/assets/sticker-map-tools.png"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold">sticker-map</h3>
                  <p className="text-text-em-low text-sm">
                    A tool for organizing and mapping sticker collections.
                  </p>
                </div>
              </Link>
              <Link
                className="border-border-base hover:bg-surface-elevated group flex flex-col gap-3 rounded-lg border p-4 transition-colors"
                href="/pawgrip"
              >
                <div className="relative h-40 w-full overflow-hidden rounded-md">
                  <Image
                    fill
                    unoptimized
                    alt="pawgrip tool"
                    className="object-cover object-center"
                    src="https://andrehadianto.github.io/andrehadianto.com/assets/pawgrips/v2-white.jpeg"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-base font-semibold">pawgrip</h3>
                  <p className="text-text-em-low text-sm">
                    Custom paw-shaped phone grips — browse and order.
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </motion.main>
      </div>
    </div>
  );
}
