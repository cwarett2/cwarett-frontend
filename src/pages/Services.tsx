import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { SEOHead } from '@/components/SEOHead';
import { 
  Play, 
  Bot, 
  Headphones, 
  Monitor, 
  CheckCircle, 
  Star, 
  Shield,
  Clock,
  Users,
  Zap,
  Download,
  Globe,
  Search,
  X
} from 'lucide-react';
import React from 'react';

const Services = () => {
  const { products, loading: productsLoading } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');

  const guarantees = [
    {
      icon: Shield,
      title: 'Garantie de fonctionnement',
      description: 'Remplacement gratuit si problème technique'
    },
    {
      icon: Clock,
      title: 'Livraison rapide',
      description: 'Vos comptes en moins de 30 minutes'
    },
    {
      icon: Users,
      title: 'Support dédié',
      description: 'Équipe disponible 24h/24, 7j/7'
    }
  ];

  // Apply search filter
  const filteredServices = products.filter(product => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.features.some(feature => feature.toLowerCase().includes(query))
    );
  });

  // Sort by popular first, then alphabetically
  const sortedServices = [...filteredServices].sort((a, b) => {
    // Popular products first
    if (a.popular && !b.popular) return -1;
    if (!a.popular && b.popular) return 1;
    // Then alphabetically
    return a.name.localeCompare(b.name);
  });

  const clearSearch = () => {
    setSearchQuery('');
  };

  const hasActiveSearch = searchQuery.trim() !== '';

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Nos Services Premium"
        description="Tous nos services premium disponibles : Netflix, ChatGPT, Spotify, Disney+ et plus encore. Prix compétitifs et garantie incluse."
        keywords="services premium, Netflix, ChatGPT, Spotify, Disney+, abonnements tunisie"
      />
      
      {/* Header */}
     
      {/* Search Section */}
      <section className="py-8 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Rechercher un service</h2>
              {hasActiveSearch && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Effacer
                </Button>
              )}
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher par nom, catégorie ou fonctionnalité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 h-12 text-base"
              />
              {hasActiveSearch && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {hasActiveSearch && (
              <div className="mt-3 text-sm text-muted-foreground text-center">
                {filteredServices.length} résultat{filteredServices.length > 1 ? 's' : ''} pour "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Results */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {!productsLoading && (
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                {hasActiveSearch ? 'Résultats de recherche' : 'Tous nos services'}
              </h2>
              <p className="text-muted-foreground">
                {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} disponible{filteredServices.length > 1 ? 's' : ''}
              </p>
            </div>
          )}

          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="gradient-card border-border animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-20 bg-muted rounded mb-4"></div>
                    <div className="h-8 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded mb-4"></div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded"></div>
                    </div>
                    <div className="h-10 bg-muted rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : sortedServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {products.length === 0 ? 'Aucun service disponible' : hasActiveSearch ? 'Aucun résultat trouvé' : 'Aucun service disponible'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {products.length === 0 
                  ? 'Nos services seront bientôt disponibles.' 
                  : hasActiveSearch 
                    ? 'Essayez avec d\'autres mots-clés ou vérifiez l\'orthographe.'
                    : 'Nos services seront bientôt disponibles.'
                }
              </p>
              {products.length > 0 && hasActiveSearch && (
                <Button onClick={clearSearch} variant="outline">
                  Effacer la recherche
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedServices.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
       <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Nos Services
              <span className="text-white ml-2">
                Premium
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez notre gamme complète de comptes premium aux prix les plus compétitifs 
              du marché tunisien. Qualité garantie, support inclus.
            </p>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {guarantees.map((guarantee, index) => (
              <Card key={guarantee.title} className="glass border-white/10 hover-lift animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <guarantee.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{guarantee.title}</h3>
                  <p className="text-sm text-muted-foreground">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl lg:text-5xl font-bold mb-8">
              Questions fréquentes
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold mb-2">Les comptes sont-ils légaux ?</h3>
                <p className="text-white/80 text-sm">
                  Oui, tous nos comptes sont obtenus légalement via des promotions et offres spéciales.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Combien de temps durent les comptes ?</h3>
                <p className="text-white/80 text-sm">
                  La durée varie selon le service, de 3 à 12 mois avec garantie incluse.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Que se passe-t-il en cas de problème ?</h3>
                <p className="text-white/80 text-sm">
                  Nous remplaçons immédiatement tout compte défaillant pendant la période de garantie.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Comment recevoir mon compte ?</h3>
                <p className="text-white/80 text-sm">
                  Après paiement, vous recevez vos identifiants par email ou WhatsApp sous 30 minutes.
                </p>
              </div>
            </div>
            
            <div className="mt-12">
              <Button variant="secondary" size="xl" asChild>
                <Link to="/contact">
                  Une autre question ? Contactez-nous
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
