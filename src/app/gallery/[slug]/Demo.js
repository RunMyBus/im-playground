// import * as React from "react";
// import Lightbox from "yet-another-react-lightbox";
// import Captions from "yet-another-react-lightbox/plugins/captions";
// import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
// import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
// import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
// import Video from "yet-another-react-lightbox/plugins/video";
// import Zoom from "yet-another-react-lightbox/plugins/zoom";
// import "yet-another-react-lightbox/plugins/captions.css";
// import "yet-another-react-lightbox/plugins/thumbnails.css";

// import { LightboxButton, Paragraph, Title } from "@/components";
// import { advancedSlides, slides } from "@/data/slides";

// export default function BasicExample() {
//   const [basicExampleOpen, setBasicExampleOpen] = React.useState(false);
//   const [advancedExampleOpen, setAdvancedExampleOpen] = React.useState(false);

//   return (
//     <>
//       <Title>Basic Example</Title>

//       <Paragraph>
//         Full-blown example with most of the plugins enabled (Captions,
//         Fullscreen, Slideshow, Thumbnails, Video, Zoom).
//       </Paragraph>

//       <Lightbox
//         open={advancedExampleOpen}
//         close={() => setAdvancedExampleOpen(false)}
//         slides={advancedSlides}
//         plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
//       />

//       <LightboxButton onClick={() => setAdvancedExampleOpen(true)} />

//       <Paragraph>
//         Basic example demonstrating lightbox core features with no plugins.
//       </Paragraph>

//       <Lightbox
//         open={basicExampleOpen}
//         close={() => setBasicExampleOpen(false)}
//         slides={slides}
//       />

//       <LightboxButton onClick={() => setBasicExampleOpen(true)} />
//     </>
//   );
// }


// const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];


// export const slides = [
//   { asset: "image47.5d5c8ebf.jpeg", width: 3840, height: 7844 },
//   { asset: "image48.c3acad57.jpeg", width: 3840, height: 5760 },
//   { asset: "image49.2da6704b.jpeg", width: 3840, height: 2560 },
//   { asset: "image50.d0a43c01.jpeg", width: 3840, height: 5760 },
//   { asset: "image51.f63b7fea.jpeg", width: 3840, height: 2560 },
// ].map(({ asset, width, height }) => ({
//   src: assetLink(asset, width),
//   width,
//   height,
//   srcSet: breakpoints.map((breakpoint) => ({
//     src: assetLink(asset, breakpoint),
//     width: breakpoint,
//     height: Math.round((height / width) * breakpoint),
//   })),
// }));

import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { LightboxButton, Paragraph, Title } from "@/components";

const breakpoints = [3840, 1920, 1080, 640, 384, 256, 128];

// Utility function to generate asset links
const assetLink = (asset, width) =>
  `/path-to-assets/${asset}?w=${width}`;

// Data for slides
const basicSlides = [
  { asset: "image47.5d5c8ebf.jpeg", width: 3840, height: 7844 },
  { asset: "image48.c3acad57.jpeg", width: 3840, height: 5760 },
  { asset: "image49.2da6704b.jpeg", width: 3840, height: 2560 },
  { asset: "image50.d0a43c01.jpeg", width: 3840, height: 5760 },
  { asset: "image51.f63b7fea.jpeg", width: 3840, height: 2560 },
].map(({ asset, width, height }) => ({
  src: assetLink(asset, width),
  width,
  height,
  srcSet: breakpoints.map((breakpoint) => ({
    src: assetLink(asset, breakpoint),
    width: breakpoint,
    height: Math.round((height / width) * breakpoint),
  })),
}));

export default function BasicExample() {
  const [isBasicOpen, setIsBasicOpen] = React.useState(false);
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false);

  return (
    <>
      <Title>Basic Example</Title>

      <Paragraph>
        Full-blown example with most of the plugins enabled (Captions,
        Fullscreen, Slideshow, Thumbnails, Video, Zoom).
      </Paragraph>

      <Lightbox
        open={isAdvancedOpen}
        close={() => setIsAdvancedOpen(false)}
        slides={basicSlides} // Ensure you're using correct slide data
        plugins={[Captions, Fullscreen, Slideshow, Thumbnails, Video, Zoom]}
      />

      <LightboxButton onClick={() => setIsAdvancedOpen(true)}>
        Open Advanced Example
      </LightboxButton>

      <Paragraph>
        Basic example demonstrating lightbox core features with no plugins.
      </Paragraph>

      <Lightbox
        open={isBasicOpen}
        close={() => setIsBasicOpen(false)}
        slides={basicSlides} // Ensure correct slide data is passed
      />

      <LightboxButton onClick={() => setIsBasicOpen(true)}>
        Open Basic Example
      </LightboxButton>
    </>
  );
}



