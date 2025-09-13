import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
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
  Filter,
  X
} from 'lucide-react';
import React from 'react';

const Services = () => {
  const { products, loading: productsLoading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 120]);
  const [sortBy, setSortBy] = useState('popular');


  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
  ];

  // Get dynamic categories from products
  const dynamicCategories = React.useMemo(() => {
    const categorySet = new Set<string>();
    products.forEach(product => {
      if (product.category) {
        categorySet.add(product.category);
      }
    });
    
    const dynamicCats = Array.from(categorySet).sort().map(cat => ({
      value: cat.toLowerCase().replace(/\s+/g, '-'),
      label: cat
    }));
    
    return [{ value: 'all', label: 'Toutes les catégories' }, ...dynamicCats];
  }, [products]);

  const sortOptions = [
    { value: 'popular', label: 'Plus populaires' },
    { value: 'price-low', label: 'Prix croissant' },
    { value: 'price-high', label: 'Prix décroissant' },
    { value: 'name', label: 'Nom A-Z' }
  ];

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

  // Map category values to display names
  const getCategoryName = (categorySlug: string) => {
    const categoryMap: { [key: string]: string } = {
      'streaming': 'Streaming & Divertissement',
      'ai': 'Intelligence Artificielle', 
      'tools': 'Outils Professionnels',
      'other': 'Autre'
    };
    return categoryMap[categorySlug] || categorySlug;
  };

  // Apply filters
  const filteredServices = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || 
      product.category.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  // Apply sorting
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'popular':
      default:
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    }
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange([0, 120]);
    setSortBy('popular');
  };

  const hasActiveFilters = selectedCategory !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 120 || sortBy !== 'popular';

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Nos Services Premium"
        description="Tous nos services premium disponibles : Netflix, ChatGPT, Spotify, Disney+ et plus encore. Prix compétitifs et garantie incluse."
        keywords="services premium, Netflix, ChatGPT, Spotify, Disney+, abonnements tunisie"
      />
      
      {/* Header */}
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

      {/* Filters Section */}
      <section className="py-8 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filtres</h2>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Effacer
                </Button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              {/* Category Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">Catégorie</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dynamicCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Prix: {priceRange[0]} - {priceRange[1]} TND
                </label>
                <div className="w-full sm:w-[200px] px-3">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={120}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Sort Filter */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">Trier par</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {dynamicCategories.find(c => c.value === selectedCategory)?.label}
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {(priceRange[0] !== 0 || priceRange[1] !== 120) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {priceRange[0]} - {priceRange[1]} TND
                  <button
                    onClick={() => setPriceRange([0, 120])}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Services Results */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {!productsLoading && (
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">
                {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} trouvé{filteredServices.length > 1 ? 's' : ''}
              </h2>
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
                <Filter className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {products.length === 0 ? 'Aucun service disponible' : 'Aucun service trouvé'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {products.length === 0 
                  ? 'Nos services seront bientôt disponibles.' 
                  : 'Essayez d\'ajuster vos filtres pour voir plus de résultats.'
                }
              </p>
              {products.length > 0 && (
                <Button onClick={clearFilters} variant="outline">
                  Effacer tous les filtres
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