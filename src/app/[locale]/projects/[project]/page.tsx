import ProjectDetails from "./ProjectDetails";
import p1 from "@/app/images/pd1.jpg";
import p2 from "@/app/images/pd2.jpg";
import p3 from "@/app/images/pd3.jpg";
import p4 from "@/app/images/pd4.jpg";
import p5 from "@/app/images/pd5.jpg";

export default function page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; project: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const data = {
    id: "c1",
    slug: "modern-office-complex",
    title: "Modern Office Complex",
    description:
      "A state-of-the-art office building featuring sustainable design and cutting-edge technology integration. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    images: [
      { image: p1, text: "Modern Office Complex" },
      { image: p2, text: "Retail Plaza" },
      { image: p3, text: "Corporate Headquarters" },
      { image: p4, text: "Luxury Resort" },
      { image: p5, text: "Sports Complex" },
    ],
    imagesArray: [p1, p2, p3, p4, p5],
    location: "New Cairo",
    type: "Commercial",
  };
  return <ProjectDetails data={data} />;
}


// import { Metadata } from "next";
// import ProjectDetails from "./ProjectDetails";
// import { ProjectResponse } from "@/types/singleProjectApiType";
// import { fetchProjectDetailsData } from "@/api/projectsService";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string; project: string }>;
// }): Promise<Metadata> {
//   const { locale, project } = await params;
//   const projectApiData: ProjectResponse = await fetchProjectDetailsData(locale, project);

//   const { seo } = projectApiData.data;

//   const metaTags = seo.meta.meta_tags;
//   const openGraph = seo.meta.open_graph;
//   const twitterCard = seo.meta.twitter_card;
//   const hreflang = seo.meta.hreflang_tags;

//   return {
//     title: metaTags.title,
//     description: metaTags.description,
//     openGraph: {
//       title: openGraph["og:title"],
//       description: openGraph["og:description"],
//       url: openGraph["og:url"],
//       images: [
//         {
//           url: openGraph["og:image"],
//           alt: metaTags.title,
//         },
//       ],
//       type: openGraph["og:type"] as
//         | "website"
//         | "article"
//         | "book"
//         | "profile"
//         | "music.song"
//         | "music.album"
//         | "music.playlist"
//         | "music.radio_station"
//         | "video.movie"
//         | "video.episode"
//         | "video.tv_show"
//         | "video.other",
//     },
//     twitter: {
//       card: twitterCard["twitter:card"] as
//         | "summary"
//         | "summary_large_image"
//         | "app"
//         | "player",
//       title: twitterCard["twitter:title"],
//       description: twitterCard["twitter:description"],
//       images: [twitterCard["twitter:image"]],
//     },
//     metadataBase: new URL(metaTags.canonical),
//     robots: metaTags.robots,
//     alternates: {
//       canonical: metaTags.canonical,
//       languages: {
//         en: hreflang.en,
//         ar: hreflang.ar,
//         "x-default": hreflang["x-default"],
//       },
//     },
//   };
// }

// export default async function page({
//   params
// }: {
//   params: Promise<{ locale: string; project: string }>;
// }) {
//   const { locale, project } = await params;
//   const projectApiData: ProjectResponse = await fetchProjectDetailsData(locale, project);
//   return <ProjectDetails projectApiData={projectApiData} />;
// }