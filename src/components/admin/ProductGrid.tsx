import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  features: string[];
  color: string;
  popular: boolean;
  promotion: boolean;
  badge: string;
  active: boolean;
}

interface ProductGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

const categoryOptions = [
  { value: 'streaming', label: 'Streaming & Divertissement' },
  { value: 'ai', label: 'Intelligence Artificielle' },
  { value: 'tools', label: 'Outils Professionnels' },
  { value: 'other', label: 'Autre' },
];

export const ProductGrid = ({ products, onEdit, onDelete, onAdd }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Plus className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucun produit</h3>
        <p className="text-muted-foreground mb-4">
          Commencez par ajouter votre premier produit.
        </p>
        <Button onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product._id} className="relative overflow-hidden">
          {product.popular && (
            <Badge className="absolute top-2 right-2 z-10">
              Populaire
            </Badge>
          )}
          
          {/* Product Image */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <Badge variant="outline" className="mt-1">
                  {categoryOptions.find(c => c.value === product.category)?.label}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                {product.price} TND
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {product.originalPrice} TND
                </span>
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Caractéristiques:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {product.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
                {product.features.length > 3 && (
                  <li className="text-xs">+{product.features.length - 3} autres...</li>
                )}
              </ul>
            </div>
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <Badge variant={product.active ? "default" : "secondary"}>
                  {product.active ? "Actif" : "Inactif"}
                </Badge>
                {product.promotion && (
                  <Badge variant="outline" className="text-orange-600 border-orange-600">
                    Promotion
                  </Badge>
                )}
                {product.badge && (
                  <Badge variant="outline">{product.badge}</Badge>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(product)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(product._id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};