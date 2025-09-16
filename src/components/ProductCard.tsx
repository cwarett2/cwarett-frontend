import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';
import { Product } from '@/hooks/useProducts';


interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  // Get the cheapest subscription for display
  const cheapestSubscription = product.subscriptions?.length > 0 
    ? product.subscriptions.reduce((min, sub) => sub.price < min.price ? sub : min)
    : null;
  return (
    <Card 
      className={`relative overflow-hidden gradient-card border-border hover-lift animate-slide-up group ${
        product.popular ? 'ring-2 ring-primary/50' : ''
      }`}
      style={{animationDelay: `${index * 150}ms`}}
    >
      {(product.popular || product.badge) && (
        <div className="absolute top-0 right-0 z-10">
          <Badge variant={product.popular ? "default" : "secondary"} className="rounded-bl-lg rounded-tr-lg">
            {product.badge || 'Populaire'}
          </Badge>
        </div>
      )}
      
      {product.promotion && (
        <div className="absolute top-0 left-0 z-10">
          <Badge variant="outline" className="rounded-br-lg rounded-tl-lg bg-orange-100 text-orange-700 border-orange-300">
            Promotion
          </Badge>
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <CardHeader className="pb-4">
        <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardHeader>
      
      <CardContent className="pt-0">
        {cheapestSubscription ? (
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-sm text-muted-foreground">À partir de</span>
            <span className="text-3xl font-bold text-primary">{cheapestSubscription.price}</span>
            <span className="text-muted-foreground">TND</span>
          </div>
        ) : (
          <div className="flex items-baseline space-x-2 mb-4">
            <span className="text-lg text-muted-foreground">Prix sur demande</span>
          </div>
        )}
        
        <ul className="space-y-3 mb-6">
          {product.features.slice(0, 3).map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center space-x-3 text-sm">
              <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
          {product.features.length > 3 && (
            <li className="text-xs text-muted-foreground">
              +{product.features.length - 3} autres caractéristiques...
            </li>
          )}
        </ul>
        
        <div className="space-y-2">
          <Button 
             variant={product.color as any}
            className="w-full"
            size="lg"
            asChild
          >
            <Link to={`/product/${product._id}`}>
              Voir les abonnements
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
