import Apache from "./Apache";
import Astro from "./Astro";
import AWS from "./AWS";
import Bun from "./Bun";
import CiCd from "./CiCd";
import Cloudflare from "./Cloudflare";
import CSS from "./CSS";
import Docker from "./Docker";
import ExpressJs from "./ExpressJs";
import Fastify from "./Fastify";
import Figma from "./Figma";
import Git from "./Git";
import Github from "./Github";
import GoogleCloud from "./GoogleCloud";
import GraphQL from "./GraphQL";
import Html from "./Html";
import JavaScript from "./JavaScript";
import MDXIcon from "./MDXIcon";
import MongoDB from "./MongoDB";
import Motion from "./Motion";
import MySQL from "./MySQL";
import Netlify from "./Netlify";
import NextJs from "./NextJs";
import Nginx from "./Nginx";
import NodeJs from "./NodeJs";
import PostgreSQL from "./PostgreSQL";
import Postman from "./Postman";
import Prisma from "./Prisma";
import Proxmox from "./Proxmox";
import ReactIcon from "./ReactIcon";
import Redis from "./Redis";
import Sanity from "./Sanity";
import SendIcon from "./SendIcon";
import Shadcn from "./Shadcn";
import SocketIo from "./SocketIo";
import TailwindCss from "./TailwindCss";
import ThreeJs from "./ThreeJs";
import TypeScript from "./TypeScript";
import Vercel from "./Vercel";

/**
 * Static lookup for the tech chips.
 *
 * A namespace import indexed by a variable (`TechLogos[logo]`) defeats tree
 * shaking, so the mapping is spelled out. Add an icon here when a StackItem
 * needs to name it.
 */
export const TECH_LOGOS = {
  Apache,
  Astro,
  AWS,
  Bun,
  CiCd,
  Cloudflare,
  CSS,
  Docker,
  ExpressJs,
  Fastify,
  Figma,
  Git,
  Github,
  GoogleCloud,
  GraphQL,
  Html,
  JavaScript,
  MDXIcon,
  MongoDB,
  Motion,
  MySQL,
  Netlify,
  NextJs,
  Nginx,
  NodeJs,
  PostgreSQL,
  Postman,
  Prisma,
  Proxmox,
  ReactIcon,
  Redis,
  Sanity,
  SendIcon,
  Shadcn,
  SocketIo,
  TailwindCss,
  ThreeJs,
  TypeScript,
  Vercel,
} as const;

export type TechLogoName = keyof typeof TECH_LOGOS;
