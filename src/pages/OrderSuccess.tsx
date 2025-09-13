import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Home, MessageCircle, Clock } from 'lucide-react';

const OrderSuccess = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6 animate-glow">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            Commande confirmée !
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Votre commande a été enregistrée avec succès. Notre équipe va vous contacter 
            très prochainement pour finaliser votre achat.
          </p>

          {/* Next Steps Card */}
          <Card className="gradient-card border-border mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Prochaines étapes</h2>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Confirmation par téléphone</h3>
                    <p className="text-sm text-muted-foreground">
                      Nous vous appellerons dans les 15 minutes pour confirmer votre commande
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Instructions de paiement</h3>
                    <p className="text-sm text-muted-foreground">
                      Nous vous fournirons les détails pour effectuer le paiement
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Livraison des comptes</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevez vos identifiants par WhatsApp ou email sous 30 minutes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="bg-muted/30 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Temps de traitement estimé</span>
            </div>
            <p className="text-2xl font-bold text-primary mb-2">15-30 minutes</p>
            <p className="text-sm text-muted-foreground">
              Notre équipe traite votre commande en priorité
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Retour à l'accueil
              </Link>
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">
                <MessageCircle className="mr-2 h-5 w-5" />
                Nous contacter
              </Link>
            </Button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-sm text-muted-foreground">
            <p>
              Une question ? Contactez-nous sur WhatsApp au +216 XX XXX XXX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;