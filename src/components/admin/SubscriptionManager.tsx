import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import { SubscriptionForm } from '@/components/admin/SubscriptionForm';
import { toast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Users, 
  Monitor, 
  Play,
  Download,
  Shield,
  Crown
} from 'lucide-react';
import { Subscription } from '@/types/subscription';

interface SubscriptionManagerProps {
  productId: string;
  productName: string;
}

export const SubscriptionManager = ({ productId, productName }: SubscriptionManagerProps) => {
  const { subscriptions, loading, createSubscription, updateSubscription, deleteSubscription } = useSubscriptions(productId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const handleSubmit = async (subscriptionData: Omit<Subscription, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingSubscription) {
        await updateSubscription(editingSubscription._id!, subscriptionData);
        toast({
          title: "Succès",
          description: "Abonnement mis à jour avec succès",
        });
      } else {
        await createSubscription(subscriptionData);
        toast({
          title: "Succès",
          description: "Abonnement créé avec succès",
        });
      }
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.response?.data?.error || "Une erreur est survenue",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet abonnement ?')) return;

    try {
      await deleteSubscription(id);
      toast({
        title: "Succès",
        description: "Abonnement supprimé avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'abonnement",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (subscription: Subscription) => {
    setEditingSubscription(subscription);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingSubscription(null);
  };

  const getDurationText = (duration: number, durationType: string) => {
    const unit = durationType === 'days' ? 'jour' : durationType === 'months' ? 'mois' : 'an';
    const unitPlural = durationType === 'days' ? 'jours' : durationType === 'months' ? 'mois' : 'ans';
    return `${duration} ${duration > 1 ? unitPlural : unit}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Abonnements pour {productName}</h3>
          <p className="text-sm text-muted-foreground">
            Gérez les différents types d'abonnements disponibles pour ce produit
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un abonnement
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSubscription ? 'Modifier l\'abonnement' : 'Ajouter un abonnement'}
              </DialogTitle>
            </DialogHeader>
            
            <SubscriptionForm
              subscription={editingSubscription}
              productId={productId}
              productName={productName}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {subscriptions.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
          <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Aucun abonnement</h3>
          <p className="text-muted-foreground mb-4">
            Commencez par ajouter le premier abonnement pour ce produit.
          </p>
          <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un abonnement
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <Card key={subscription._id} className="relative overflow-hidden hover:shadow-md transition-shadow">
              {subscription.popular && (
                <div className="absolute top-2 right-2 z-10">
                  <Badge className="bg-primary text-primary-foreground">
                    <Crown className="h-3 w-3 mr-1" />
                    Populaire
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{subscription.name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {subscription.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-primary">{subscription.price}</span>
                  <span className="text-muted-foreground">TND</span>
                  {subscription.originalPrice && subscription.originalPrice > subscription.price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {subscription.originalPrice} TND
                    </span>
                  )}
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Pour {getDurationText(subscription.duration, subscription.durationType)}
                </div>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3 text-primary" />
                    <span>{getDurationText(subscription.duration, subscription.durationType)}</span>
                  </div>
                  
                  {subscription.maxUsers && (
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3 text-success" />
                      <span>{subscription.maxUsers} utilisateurs</span>
                    </div>
                  )}
                  
                  {subscription.devices && (
                    <div className="flex items-center space-x-1">
                      <Monitor className="h-3 w-3 text-accent" />
                      <span>{subscription.devices} appareils</span>
                    </div>
                  )}
                  
                  {subscription.quality && (
                    <div className="flex items-center space-x-1">
                      <Play className="h-3 w-3 text-netflix" />
                      <span>{subscription.quality}</span>
                    </div>
                  )}
                  
                  {subscription.downloadable && (
                    <div className="flex items-center space-x-1">
                      <Download className="h-3 w-3 text-blue-500" />
                      <span>Téléchargeable</span>
                    </div>
                  )}
                  
                  {!subscription.adsSupported && (
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-green-500" />
                      <span>Sans pub</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium">Caractéristiques:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {subscription.features.slice(0, 2).map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        <span className="line-clamp-1">{feature}</span>
                      </li>
                    ))}
                    {subscription.features.length > 2 && (
                      <li className="text-xs">+{subscription.features.length - 2} autres...</li>
                    )}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant={subscription.active ? "default" : "secondary"}>
                      {subscription.active ? "Actif" : "Inactif"}
                    </Badge>
                    {subscription.promotion && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        Promotion
                      </Badge>
                    )}
                    {subscription.badge && (
                      <Badge variant="outline">{subscription.badge}</Badge>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(subscription)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(subscription._id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};