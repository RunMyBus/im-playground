"use client";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

// Social share media list options with icon and URL
export const socials = [
  {
    outlet: "Whatsapp",
    id: 1,
    href: "https://api.whatsapp.com/send?text=I%27ve%20proudly%20accepted%20%23HaraHaiTohBharaHai%20%23GreenindiaChallenge.%20Now%2C%20I%20challenge%20%40tag1%2C%20%40tag2%2C%20%40tag3%20to%20plant%203%20Trees%20and%20nurture%20them%20for%203%20years%20and%20pass%20the%20Challenge%20to%203%20others.%20Let%20us%20start%20a%20%23greenrevolution%20%23greenresolution",
    background: "#4caf50",
    color: "white",
    label: " Share in WhatsApp",
    icon: <WhatsappIcon />,
  },
  {
    outlet: "Facebook",
    id: 2,
    href: "https://www.facebook.com/sharer/sharer.php?u=https://nj3mg3nw-3000.inc1.devtunnels.ms/share-content",
    background: "#3b5898",
    color: "white",
    label: "Post to Facebook",
    icon: <FacebookIcon />,
  },
  {
    outlet: "Twitter",
    id: 3,
    href: "https://twitter.com/intent/tweet?text=I%27ve%20proudly%20accepted%20%23HaraHaiTohBharaHai%20%23GreenindiaChallenge.%20Now%2C%20I%20challenge%20%40tag1%2C%20%40tag2%2C%20%40tag3%20to%20plant%203%20Trees%20and%20nurture%20them%20for%203%20years%20and%20pass%20the%20Challenge%20to%203%20others.%20Let%20us%20start%20a%20%23greenrevolution%20%23greenresolution",
    background: "#00aced",
    color: "white",
    label: " Post to X",
    icon: <XIcon />,
  },
];

export default function Social() {
  const title =
    "I’ve proudly joined the #HaraHaiTohBharaHai #GreenIndiaChallenge! Now, I call on my Green Warriors to plant 3 trees and care for them for 3 years. Pass it along and let’s kick off a #GreenRevolution #GreenResolution!";

  return (
      <div className="thankyou-socials">
        {socials.map((item) => {
          if (item.outlet === "Whatsapp") {
            return (
                <WhatsappShareButton
                    key={item.outlet}
                    url="https://ignitingminds.org/take-the-challenge"
                    title={title}
                    className="share-btn whatsapp"
                >
                  <WhatsappIcon size={22} />
                  <span>WhatsApp</span>
                </WhatsappShareButton>
            );
          }

          if (item.outlet === "Facebook") {
            return (
                <FacebookShareButton
                    key={item.outlet}
                    url="https://ignitingminds.org/"
                    className="share-btn facebook"
                >
                  <FacebookIcon size={22} />
                  <span>Facebook</span>
                </FacebookShareButton>
            );
          }

          return (
              <TwitterShareButton
                  key={item.outlet}
                  url="https://ignitingminds.org/"
                  title={title}
                  className="share-btn twitter"
              >
                <XIcon size={22} />
              </TwitterShareButton>
          );
        })}
      </div>
  );

}
