import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { useOrders } from '@/hooks/useOrders';
import { toast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  User, 
  Mail, 
  Phone, 
  MessageCircle, 
  CheckCircle,
  ArrowLeft,
  CreditCard,
  Smartphone,
  Building2
} from 'lucide-react';


const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { createOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    paymentMethod: 'd17'
  });

  const paymentMethods = [
    {
      id: 'd17',
      name: 'D17',
      description: 'Paiement via D17 (Dinars électroniques)',
      icon: CreditCard,
      color: 'text-blue-600'
    },
    {
      id: 'flouci',
      name: 'Flouci',
      description: 'Paiement mobile via Flouci',
      icon: Smartphone,
      color: 'text-green-600'
    },
    {
      id: 'virement',
      name: 'Virement bancaire',
      description: 'Virement bancaire traditionnel',
      icon: Building2,
      color: 'text-purple-600'
    }
     {
      id: 'e-dinar',
      name: 'E-Dinar',
      description: 'Paiement avec E-dinar',
      icon: Smartphone,
      color: 'text-green-600'
    },
     {
      id: 'poste',
      name: 'Poste',
      description: 'Paiement avec Poste',
      icon: Building2,
      color: 'text-green-600'
    }
  ];
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Panier vide",
        description: "Ajoutez des services à votre panier avant de commander.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const selectedPaymentMethod = paymentMethods.find(method => method.id === formData.paymentMethod);
      
      // Create order with cart items
      const orderData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: items.map(item => `${item.name} (x${item.quantity})`).join(', '),
        message: `Méthode de paiement: ${selectedPaymentMethod?.name}\n\n${formData.message}\n\nDétails de la commande:\n${items.map(item => 
          `- ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)} TND`
        ).join('\n')}\n\nTotal: ${total.toFixed(2)} TND`,
        paymentMethod: formData.paymentMethod,
        status: 'en_attente' as const,
        priority: 'normale' as const
      };

      await createOrder(orderData);

      toast({
        title: "Commande confirmée !",
        description: "Votre commande a été enregistrée avec succès. Nous vous contacterons bientôt.",
      });
      
      // Clear cart and redirect
      clearCart();
      navigate('/order-success');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre commande.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
          <p className="text-muted-foreground mb-6">
            Ajoutez des services à votre panier pour procéder au checkout.
          </p>
          <Button asChild>
            <Link to="/services">Voir nos services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Finalisez votre commande</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Résumé de la commande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => {
                  
                  return (
                    <div key={item._id} className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                          <Badge variant="outline">x{item.quantity}</Badge>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm text-muted-foreground">
                            {item.price} TND × {item.quantity}
                          </span>
                          <span className="font-bold text-primary">
                            {(item.price * item.quantity).toFixed(2)} TND
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                <Separator />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">{total.toFixed(2)} TND</span>
                </div>
              </CardContent>
            </Card>

            {/* Guarantees */}
            <Card className="gradient-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Nos garanties</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Comptes 100% fonctionnels</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Livraison sous 30 minutes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Support 24/7 inclus</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm">Remplacement gratuit</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information Form */}
          <div>
            <Card className="gradient-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations de contact
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Remplissez vos informations pour finaliser la commande
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Nom complet *
                      </Label>
                      <Input 
                        id="name"
                        placeholder="Votre nom complet"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Téléphone *
                      </Label>
                      <Input 
                        id="phone"
                        placeholder="+216 XX XXX XXX"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>

                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <Label className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Méthode de paiement *
                      </Label>
                      <RadioGroup 
                        value={formData.paymentMethod} 
                        onValueChange={(value) => handleInputChange('paymentMethod', value)}
                        className="space-y-3"
                      >
                        {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <div className="flex items-center space-x-3 flex-1">
                              <div className={`p-2 rounded-full bg-muted ${method.color}`}>
                                <method.icon className="h-5 w-5" />
                              </div>
                              <div className="flex-1">
                                <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                  {method.name}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                  {method.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Message (optionnel)
                      </Label>
                      <Textarea 
                        id="message"
                        placeholder="Questions ou demandes spéciales..."
                        rows={3}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="font-semibold">Étapes suivantes</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Confirmation de commande</p>
                          <p>Nous vous contacterons pour confirmer votre commande</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold">
                          2
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Paiement</p>
                          <p>Effectuez le paiement via {paymentMethods.find(m => m.id === formData.paymentMethod)?.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 rounded-full bg-success text-success-foreground flex items-center justify-center text-xs font-bold">
                          3
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Livraison</p>
                          <p>Recevez vos comptes sous 30 minutes maximum</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Confirmer la commande
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

