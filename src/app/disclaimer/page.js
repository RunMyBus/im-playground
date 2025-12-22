import Policies from "./component"; //main page component imported

export async function generateMetadata() {
  return {
    title: "Disclaimer | Igniting Minds",
    description: "Disclaimer - Read the disclaimer and terms of use for Igniting Minds Organization.",
    keywords: "Disclaimer, Igniting Minds, Terms of Use",
    openGraph: {
      title: "Disclaimer | Igniting Minds",
      description: "Disclaimer - Read the disclaimer and terms of use for Igniting Minds Organization.",
      images: `https://ignitingminds.org/images/Frame.png`,
    },
  };
}

export default function Page() {
  return <Policies />;
}
