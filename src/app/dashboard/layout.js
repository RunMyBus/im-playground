export const metadata = {
  title: "Dashboard | Igniting Minds",
  description: "View your personalized Igniting Minds dashboard to measure your contributions, view progress, and stay connected with ongoing sustainability efforts.",
  keywords: "dashboard, user profile, environmental activities, Igniting Minds account, impact tracking",
  openGraph: {
    title: "Dashboard | Igniting Minds",
    description: "View your personalized Igniting Minds dashboard to measure your contributions, view progress, and stay connected with ongoing sustainability efforts.",
    images: [
      {
        url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
        width: 1200,
        height: 600,
      },
    ],
  },
};

export default function DashboardLayout({ children }) {
  return (
    <>
     
      {children}
     
    </>
  );
}
