import Header_new from "@/app/components/header_new";
import Footer from "@/app/components/footer";
import { formatTitle } from "@/app/utils/titleValidator";

export const metadata = {
  title: formatTitle("Blogs | Igniting Minds"),
  description: "Read blogs from Igniting Minds that share impactful ideas, stories, and perspectives shaping a sustainable future.",
  openGraph: {
    title: formatTitle("Blogs | Igniting Minds"),
    description: "Read blogs from Igniting Minds that share impactful ideas, stories, and perspectives shaping a sustainable future.",
     images: [
      {
        url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
        width: 1200,
        height: 600,
      },
    ],
  },
};

export default function BlogsLayout({ children }) {
  return (
    <>
     
      {children}
     
    </>
  );
}
