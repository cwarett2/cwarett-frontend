import { useParams, Navigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { 
  CheckCircle, 
  Star, 
  Shield,
  Clock,
  Crown,
  Sparkles,
  ArrowLeft,
  Users,
  Monitor,
  Download,
  Play,
  Zap,
  Award,
  Heart,
  ChevronRight
} from 'lucide-react';

const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { products, loading: productsLoading } = useProducts();
  const { addItem } = useCart();
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);

  if (!productId) {
    return <Navigate to="/services" replace />;
  }

  const product = products.find(p => p._id === productId);

  if (productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin-slow shadow-lg mb-4" />
          <p className="text-muted-foreground text-lg">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return <Navigate to="/services" replace />;
  }

  const subscriptions = product.subscriptions || [];

  const handleAddToCart = (subscription: { name: string; price: number; promotion: boolean }) => {
    const cartItem = {
      ...product,
      name: `${product.name} - ${subscription.name}`,
      price: subscription.price,
      description: `${product.description} - Abonnement ${subscription.name}`,
    };
    
    addItem(cartItem);
    toast({
      title: "✨ Ajouté au panier",
      description: `${product.name} - ${subscription.name} a été ajouté à votre panier.`,
    });
  };

  const guarantees = [
    {
      icon: Shield,
      title: 'Garantie 100%',
      description: 'Remplacement gratuit en cas de problème',
      color: 'success'
    },
    {
      icon: Clock,
      title: 'Livraison Express',
      description: 'Vos identifiants en moins de 30 minutes',
      color: 'primary'
    },
    {
      icon: Users,
      title: 'Support Premium',
      description: 'Équipe dédiée disponible 24h/24',
      color: 'accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Breadcrumb */}
      <div className="border-b border-border bg-card/30">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
              Services
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="text-muted-foreground hover:text-primary transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Product Info */}
            <div className="animate-fade-in">
              {/* Back Button */}
              <Button variant="ghost" size="sm" className="mb-6 -ml-2" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>

              {/* Badges */}
              <div className="flex items-center flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-card/50 backdrop-blur-sm">
                  {product.category}
                </Badge>
                {product.popular && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 backdrop-blur-sm">
                    <Crown className="h-3 w-3 mr-1" />
                    Populaire
                  </Badge>
                )}
                {product.promotion && (
                  <Badge className="bg-orange-100 text-orange-700 border-orange-300 backdrop-blur-sm">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Promotion
                  </Badge>
                )}
                {product.badge && (
                  <Badge variant="secondary" className="backdrop-blur-sm">
                    {product.badge}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {product.name}
                <span className="block text-2xl lg:text-3xl text-primary mt-2 font-medium">
                  Offre spéciale
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {guarantees.map((guarantee, index) => (
                  <div key={guarantee.title} className="text-center group">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-${guarantee.color}/10 mb-2 group-hover:shadow-glow transition-all`}>
                      <guarantee.icon className={`h-6 w-6 text-${guarantee.color}`} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{guarantee.title}</h3>
                    <p className="text-xs text-muted-foreground">{guarantee.description}</p>
                  </div>
                ))}
              </div>

              {/* Product Features */}
              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-xl flex items-center space-x-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span>Ce qui est inclus</span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-card/50 border border-border/50 hover:bg-card/80 transition-all">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Proof */}
           
            </div>

            {/* Product Image */}
            <div className="relative animate-slide-up">
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                
                {/* Main Image Container */}
                <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/90 text-black backdrop-blur-sm shadow-lg">
                      <Heart className="h-3 w-3 mr-1 text-red-500" />
                      Service Premium
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subscriptions Section */}
      <section className="py-16 bg-card/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary animate-glow" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Choisissez votre plan
              </span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Abonnements
              <span className="text-white ml-2">disponibles</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Sélectionnez l'abonnement qui correspond le mieux à vos besoins. 
              Tous nos plans incluent un support premium et une garantie de satisfaction.
            </p>
          </div>

          {subscriptions.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
                <Clock className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Bientôt disponible</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Les abonnements pour ce produit seront disponibles très prochainement. 
                Restez connecté !
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact">Être notifié</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {subscriptions.map((subscription, index) => {
                const isPromoted = subscription.promotion;
                const isPopular = index === 1 || subscriptions.length === 1; // Middle option or single option
                
                return (
                  <Card 
                    key={index} 
                    className={`relative overflow-hidden hover-lift animate-slide-up transition-all duration-300 h-[600px] flex flex-col ${
                      isPromoted ? 'ring-2 ring-primary shadow-glow scale-105' : ''
                    } ${isPopular && !isPromoted ? 'ring-2 ring-accent shadow-accent scale-105' : ''}`}
                     style={{animationDelay: `${index * 150}ms`}}
                   >
                     {/* Popular Badge */}
                     

                     {/* Decorative Background */}
                     <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-2xl"></div>

                    <CardHeader className="text-center pb-6 pt-8 flex-shrink-0">
                       <div className="space-y-2">
                         <CardTitle className="text-2xl font-bold">{subscription.name}</CardTitle>
                         
                         <div className="space-y-3">
                           <div className="flex items-baseline justify-center space-x-2">
                             <span className="text-5xl font-bold text-primary">{subscription.price}</span>
                             <div className="text-left">
                               <span className="text-muted-foreground text-sm">TND</span>
                              
                             </div>
                           </div>
                           
                         
                         </div>
                       </div>
                     </CardHeader>

                    <CardContent className="flex-1 flex flex-col pb-8">
                      <div className="flex-1 space-y-6">
                       {/* Key Features */}
                       <div className="space-y-3">
                         <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                           Fonctionnalités incluses
                         </h4>
                         <ul className="space-y-3">
                           {product.features.slice(0, 4).map((feature, featureIndex) => (
                             <li key={featureIndex} className="flex items-start space-x-3">
                               <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                               <span className="text-sm leading-relaxed">{feature}</span>
                             </li>
                           ))}
                           {product.features.length > 4 && (
                             <li className="flex items-center space-x-3 text-primary">
                               <Sparkles className="h-4 w-4" />
                               <span className="text-sm font-medium">
                                 +{product.features.length - 4} autres fonctionnalités
                               </span>
                             </li>
                           )}
                         </ul>
                       </div>

                       {/* Service Specs */}
                      
                      </div>

                      {/* Fixed bottom section */}
                      <div className="mt-auto space-y-4">
                       {/* CTA Button */}
                       <Button 
                         variant={isPromoted ? 'hero' : isPopular ? 'accent' : product.color as any}
                         className="w-full group relative overflow-hidden"
                         size="lg"
                         onClick={() => handleAddToCart(subscription)}
                       >
                         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                         <Zap className="mr-2 h-5 w-5" />
                         Choisir cet abonnement
                       </Button>

                       {/* Money Back Guarantee */}
                       <div className="text-center text-xs text-muted-foreground">
                         <Shield className="h-4 w-4 inline mr-1" />
                         Garantie de remboursement 30 jours
                       </div>
                      </div>
                     </CardContent>
                   </Card>
                 );
               })}
            </div>
          )}
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Pourquoi choisir
              <span className="text-white ml-2">{product.name} ?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Features List */}
            <div className="space-y-8">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{feature}</h3>
                   
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Card */}
            <div className="relative">
              <Card className="gradient-card border-border shadow-2xl">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                      <Star className="h-8 w-8 text-primary animate-glow" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Service d'Excellence</h3>
                    <p className="text-muted-foreground">
                      Rejoignez des milliers de clients satisfaits
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-success mb-1">99.9%</div>
                      <div className="text-sm text-muted-foreground">Uptime garanti</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                      <div className="text-sm text-muted-foreground">Support client</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-accent mb-1">30min</div>
                      <div className="text-sm text-muted-foreground">Livraison max</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-netflix mb-1">100%</div>
                      <div className="text-sm text-muted-foreground">Satisfaction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Questions fréquentes
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur {product.name}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Comment fonctionne l'abonnement ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Après achat, vous recevez vos identifiants par email ou WhatsApp sous 30 minutes maximum. 
                  Connectez-vous immédiatement et profitez de votre service premium.
                </p>
              </div>
              
              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Puis-je changer d'abonnement ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Absolument ! Contactez notre support pour modifier votre abonnement à tout moment. 
                  Nous vous accompagnons dans tous vos changements.
                </p>
              </div>

              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Y a-t-il une garantie ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Tous nos abonnements sont garantis avec remplacement gratuit en cas de problème 
                  et remboursement sous 30 jours si non satisfait.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Le paiement est-il sécurisé ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Nous utilisons des méthodes de paiement sécurisées et vérifiées. 
                  Vos données sont protégées selon les standards internationaux.
                </p>
              </div>

              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Support client disponible ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Notre équipe d'experts est disponible 24h/24 et 7j/7 via WhatsApp, 
                  email ou téléphone pour vous assister.
                </p>
              </div>

              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-white mb-3">Combien d'appareils puis-je utiliser ?</h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  Selon l'abonnement choisi, vous pouvez utiliser plusieurs appareils simultanément. 
                  Consultez les détails de chaque plan ci-dessus.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <div className="glass p-8 rounded-2xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Prêt à commencer ?
              </h3>
              <p className="text-white/80 mb-6">
                Rejoignez des milliers de clients satisfaits et profitez de {product.name} dès maintenant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" asChild>
                  <Link to="/services">Voir d'autres services</Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/contact">Questions ? Contactez-nous</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;

