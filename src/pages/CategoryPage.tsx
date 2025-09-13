import { useParams, Navigate } from 'react-router-dom';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

const CategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { products, loading } = useProducts();

  if (!categorySlug) {
    return <Navigate to="/services" replace />;
  }

  // Filter products by category slug
  const categoryProducts = products.filter(product => 
    product.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );

  // Get category name from first product
  const categoryName = categoryProducts.length > 0 
    ? categoryProducts[0].category 
    : categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (loading) {
    return (
      <div className="min-h-screen">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <div className="h-12 bg-muted rounded mb-4 animate-pulse"></div>
              <div className="h-6 bg-muted rounded max-w-md mx-auto animate-pulse"></div>
            </div>
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
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="h-8 w-8 text-primary animate-glow" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                Catégorie
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {categoryName}
              <span className="text-white ml-2">
                Premium
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez tous nos services {categoryName} aux meilleurs prix. 
              {categoryProducts.length} service{categoryProducts.length > 1 ? 's' : ''} disponible{categoryProducts.length > 1 ? 's' : ''}.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {categoryProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Aucun service disponible</h3>
              <p className="text-muted-foreground mb-4">
                Aucun service n'est disponible dans cette catégorie pour le moment.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryProducts.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;