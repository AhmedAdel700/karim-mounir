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
