export const metadata = {  
    title: "Forest | Igniting Minds",    
    description: "Visit your Forest section to see all trees you have planted, monitor their updates, and watch your green footprint grow over time.",  
    openGraph: {        
        title: "Forest | Igniting Minds",        
        description: "Visit your Forest section to see all trees you have planted, monitor their updates, and watch your green footprint grow over time.", 
        images:[
          {
            url: "https://qa.ignitingminds.org/images/IMO_Metatitles.png",
            width: 1200,
            height: 600,
          },
        ]    
    } 
}

export default function MyForestLayout({ children }) {
  return children;
}