export interface AboutResponse {
  data: {
    about: About;
    about_structs: AboutStruct[];
    seo: SEO;
  };
}

/* ================= ABOUT ================= */
export interface About {
  title: string;
  title2: string | null;
  short_desc: string;
  text: string;
  image: string;
  alt_image: string | null;
  banner: string;
  alt_banner: string | null;
  banner2: string;
  alt_banner2: string | null;
}

/* ================= ABOUT STRUCT ================= */
export interface AboutStruct {
  title: string;
  text: string;
  icon: string;
  alt_icon: string | null;
  order: number;
}

/* ================= SEO ================= */
export interface SEO {
  meta: Meta;
  schema: SchemaItem[];
}

export interface Meta {
  meta_tags: MetaTags;
  open_graph: OpenGraph;
  twitter_card: TwitterCard;
  hreflang_tags: HreflangTags;
}

/* ================= META TAGS ================= */
export interface MetaTags {
  content_type: string;
  title: string;
  author: string;
  description: string;
  canonical: string;
  robots: string;
}

/* ================= OPEN GRAPH ================= */
export interface OpenGraph {
  "og:title": string;
  "og:description": string;
  "og:url": string;
  "og:image": string;
  "og:type": string;
}

/* ================= TWITTER ================= */
export interface TwitterCard {
  "twitter:card": string;
  "twitter:title": string;
  "twitter:description": string;
  "twitter:image": string;
}

/* ================= HREFLANG ================= */
export interface HreflangTags {
  en: string;
  ar: string;
  "x-default": string;
}

/* ================= SCHEMA ================= */
export interface SchemaItem {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
}