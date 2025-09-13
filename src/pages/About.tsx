import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Award,
  Heart,
  Zap,
  Target,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/SEOHead';

const About = () => {
  const stats = [
    { value: '2500+', label: 'Clients satisfaits', icon: Users },
    { value: '4.9/5', label: 'Note moyenne', icon: Star },
    { value: '99%', label: 'Taux de réussite', icon: CheckCircle },
    { value: '24/7', label: 'Support disponible', icon: Clock },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Sécurité',
      description: 'Nous garantissons la sécurité et la légalité de tous nos services',
      color: 'primary'
    },
    {
      icon: Heart,
      title: 'Satisfaction client',
      description: 'Votre satisfaction est notre priorité absolue',
      color: 'netflix'
    },
    {
      icon: Zap,
      title: 'Rapidité',
      description: 'Livraison ultra-rapide de vos comptes premium',
      color: 'accent'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque service offert',
      color: 'success'
    }
  ];

  const timeline = [
    {
      year: '2022',
      title: 'Création de l\'entreprise',
      description: 'Lancement de CWARETT avec une vision claire : démocratiser l\'accès aux services premium.'
    },
    {
      year: '2023',
      title: 'Expansion des services',
      description: 'Ajout de nouveaux partenariats et services premium pour répondre aux besoins croissants.'
    },
    {
      year: '2024',
      title: 'Leader du marché',
      description: 'Plus de 2500 clients satisfaits et reconnaissance comme leader en Tunisie.'
    }
  ];

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="À propos de nous"
        description="Découvrez l'histoire de CWARETT.TN, votre partenaire de confiance pour les services premium en Tunisie depuis 2022."
        keywords="CWARETT histoire, entreprise tunisienne, services premium, à propos"
      />
      
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-primary animate-glow" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                À propos de nous
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Votre partenaire
              <span className="text-white ml-2">
                de confiance
              </span>
              <br />
              <span className="text-2xl lg:text-3xl text-muted-foreground">
                pour les services premium
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Depuis 2022, CWARETT s'est imposé comme le leader tunisien dans la fourniture 
              de comptes premium. Notre mission : rendre les services de qualité accessibles à tous.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                Notre
                <span className="text-white ml-2">
                  histoire
                </span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                CWARETT est née d'une vision simple : permettre à chaque tunisien d'accéder 
                aux meilleurs services numériques sans se ruiner. Notre équipe passionnée travaille 
                jour et nuit pour vous offrir les prix les plus compétitifs du marché.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Nous croyons fermement que la technologie doit être accessible à tous. C'est pourquoi 
                nous sélectionnons rigoureusement nos partenaires et négocions les meilleurs tarifs 
                pour nos clients.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/services">Découvrir nos services</Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <Card className="gradient-card border-border hover-lift">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Award className="h-16 w-16 text-primary mx-auto mb-4 animate-glow" />
                    <h3 className="text-2xl font-bold mb-4">Certifié Excellence</h3>
                    <p className="text-muted-foreground mb-6">
                      Reconnu pour la qualité de nos services et notre support client exceptionnel.
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-success">100%</div>
                        <div className="text-xs text-muted-foreground">Légal</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-primary">24/7</div>
                        <div className="text-xs text-muted-foreground">Support</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-accent">Garanti</div>
                        <div className="text-xs text-muted-foreground">Qualité</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Nos
              <span className="text-white ml-2">
                valeurs
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et définissent notre approche client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card 
                key={value.title} 
                className="gradient-card border-border hover-lift animate-slide-up text-center"
                style={{animationDelay: `${index * 150}ms`}}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${value.color}/10 mb-4`}>
                    <value.icon className={`h-8 w-8 text-${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Notre
              <span className="text-white ml-2">
                parcours
              </span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div 
                key={item.year} 
                className={`flex items-start space-x-6 pb-12 animate-slide-up ${
                  index !== timeline.length - 1 ? 'border-l-2 border-dashed border-primary/30 ml-6' : ''
                }`}
                style={{animationDelay: `${index * 200}ms`}}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm relative -ml-6 shadow-glow">
                  {item.year.slice(-2)}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Rejoignez notre communauté
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Plus de 2500 clients nous font confiance. Découvrez pourquoi CWARETT 
            est le choix n°1 en Tunisie pour les services premium.
          </p>
          
          <div className="flex items-center justify-center space-x-8 mb-8">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-success" />
              <span className="text-white font-medium">Croissance +300%</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-white font-medium">100% Sécurisé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-accent" />
              <span className="text-white font-medium">4.9/5 Avis</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" asChild>
              <Link to="/services">Voir nos services</Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/contact">Nous rejoindre</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;