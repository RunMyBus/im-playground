import { Button } from '@/components/ui/button';
import { Leaf, Heart, Users, Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Igniting <span className="text-primary">Minds</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Empowering communities through environmental initiatives and sustainable development. 
              Together, we create a greener future for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                Get Involved
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-center mb-12">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Leaf className="w-10 h-10" />}
              title="Environmental Action"
              description="Leading tree plantation drives and green initiatives across communities."
            />
            <FeatureCard 
              icon={<Heart className="w-10 h-10" />}
              title="Community Care"
              description="Supporting local communities with sustainable development programs."
            />
            <FeatureCard 
              icon={<Users className="w-10 h-10" />}
              title="Youth Engagement"
              description="Inspiring the next generation to become environmental stewards."
            />
            <FeatureCard 
              icon={<Globe className="w-10 h-10" />}
              title="Global Impact"
              description="Creating lasting change for a sustainable planet."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
            Join thousands of volunteers who are already contributing to a greener India.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8">
            Join Our Movement
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-card border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Igniting Minds. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="text-center p-6 rounded-lg bg-background shadow-sm hover:shadow-md transition-shadow">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-heading font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Index;
