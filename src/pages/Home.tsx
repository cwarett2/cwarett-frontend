import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { SEOHead } from '@/components/SEOHead';
import { 
  Play, 
  Bot, 
  Headphones, 
  Monitor, 
  Star, 
  Shield, 
  Clock, 
  Users,
  CheckCircle,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { products = [], loading: productsLoading } = useProducts();

  // Get featured products (popular ones first, then limit to 4)
  const featuredProducts = (products || [])
    .slice() // avoid mutating original array
    .sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
    .slice(0, 4);

  const testimonials = [
    {
      name: 'Ahmed saidani',
      text: 'Service impeccable ! Mon compte Netflix fonctionne parfaitement depuis 8 mois.',
      rating: 5,
      service: 'Netflix Premium'
    },
    {
      name: 'Fatma Trabelsi',
      text: 'Très satisfaite de mon achat ChatGPT Plus. Support client réactif.',
      rating: 5,
      service: 'ChatGPT Plus'
    },
    {
      name: 'Karim Mansouri',
      text: 'Excellente qualité et prix imbattables. Je recommande vivement !',
      rating: 5,
      service: 'Spotify Premium'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Accueil"
        description="Netflix , Spotify, ChatGPT, YouTube , Apple Gift Cards, PSN, Xbox Game Pass… et bien plus encore ! Avec CWARETT, profitez de vos services premium sans attendre."
        keywords="Netflix premium tunisie, ChatGPT plus, Spotify premium, Youtube Premium , comptes premium"
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute top-32 right-20 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-success/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-primary animate-glow" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Services Premium Garantis
              </span>
            </div>

            <h1 className="text-4xl lg:text-7xl font-bold mb-6 leading-tight">
              Vos Comptes
              <span className="text-white ml-4">Premium</span>
              <br />
              <span className="text-2xl lg:text-4xl text-muted-foreground">
                Netflix, ChatGPT & Plus
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Netflix , Spotify, ChatGPT, YouTube , Apple Gift Cards, PSN, Xbox Game Pass… et bien plus encore !
              Avec CWARETT, profitez de vos services premium sans attendre.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button variant="hero" size="xl" asChild className="group">
                <Link to="/services">
                  Voir nos services
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <Link to="/contact">Contactez-nous</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Clients satisfaits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">7/7</div>
                <div className="text-sm text-muted-foreground">Support disponible</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">99%</div>
                <div className="text-sm text-muted-foreground">Taux de réussite</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Nos Services
              <span className="text-white ml-2">Premium</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Profitez de notre large sélection de comptes premium aux prix les plus compétitifs en Tunisie.
            </p>
          </div>

          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="gradient-card border-border animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-20 bg-muted rounded mb-4" />
                    <div className="h-8 bg-muted rounded mb-2" />
                    <div className="h-4 bg-muted rounded mb-4" />
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded" />
                    </div>
                    <div className="h-10 bg-muted rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Aucun service disponible</h3>
              <p className="text-muted-foreground mb-4">
                Nos services seront bientôt disponibles.
              </p>
            </div>
          )}

          {/* View All Services Button */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild className="group">
              <Link to="/services">
                Tous nos services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Pourquoi nous
              <span className="text-white ml-2">choisir ?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:shadow-glow transition-all">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Sécurisé</h3>
              <p className="text-muted-foreground">
                Tous nos comptes sont vérifiés et garantis pour une utilisation sûre.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4 group-hover:shadow-accent transition-all">
                <Clock className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-muted-foreground">
                Recevez vos comptes dans les plus brefs délais après votre commande.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4 group-hover:bg-success/20 transition-all">
                <Users className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Support 24/7</h3>
              <p className="text-muted-foreground">
                Notre équipe est disponible pour vous aider à tout moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ce que disent nos
              <span className=" text-white ml-2">clients</span>
            </h2>
          </div>

          <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
            <button
              aria-label="Précédent"
              onClick={() =>
                setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
              }
              className="bg-muted/70 hover:bg-muted rounded-full p-2 transition"
            >
              <ChevronLeft className="h-6 w-6 text-primary" />
            </button>

            <Card className="gradient-card border-border animate-fade-in flex-1">
              <CardContent className="p-8 text-center relative">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg mb-4">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
                <div className="text-sm text-muted-foreground">
                  Client {testimonials[currentTestimonial].service}
                </div>
              </CardContent>
            </Card>

            <button
              aria-label="Suivant"
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="bg-muted/70 hover:bg-muted rounded-full p-2 transition"
            >
              <ChevronRight className="h-6 w-6 text-primary" />
            </button>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentTestimonial ? 'bg-primary' : 'bg-muted'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">Prêt à commencer ?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
           Des milliers de clients nous font déjà confiance , rejoignez-les et profitez de nos services premium dès aujourd’hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="xl" asChild>
              <Link to="/services">Voir tous les services</Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
