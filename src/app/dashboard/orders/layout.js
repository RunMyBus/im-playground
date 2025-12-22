export const metadata = { 
    title: "Orders | Igniting Minds",  
    description: "View your orders, track status, and manage your purchases and tree plantation contributions with Igniting Minds.",
    openGraph: {
        title: "Orders | Igniting Minds", 
        description: "View your orders, track status, and manage your purchases and tree plantation contributions with Igniting Minds.",
        images:[
          {
           url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
            width: 1200,
            height: 600,
          },
        ] 
    }
};

export default function OrdersLayout({ children }) {
  return children;
}