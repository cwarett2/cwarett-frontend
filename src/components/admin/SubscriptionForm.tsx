import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Save, X } from 'lucide-react';
import { Subscription } from '@/types/subscription';

interface SubscriptionFormProps {
  subscription?: Subscription | null;
  productId: string;
  productName: string;
  onSubmit: (subscription: Omit<Subscription, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}

export const SubscriptionForm = ({ subscription, productId, productName, onSubmit, onCancel }: SubscriptionFormProps) => {
  const [formData, setFormData] = useState<Omit<Subscription, '_id' | 'createdAt' | 'updatedAt'>>({
    productId,
    name: '',
    duration: 1,
    durationType: 'months',
    price: 0,
    originalPrice: 0,
    features: [''],
    description: '',
    popular: false,
    promotion: false,
    badge: '',
    active: true,
    maxUsers: 1,
    quality: 'none',
    devices: 1,
    downloadable: false,
    adsSupported: false,
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        productId: subscription.productId,
        name: subscription.name,
        duration: subscription.duration,
        durationType: subscription.durationType,
        price: subscription.price,
        originalPrice: subscription.originalPrice || 0,
        features: subscription.features,
        description: subscription.description,
        popular: subscription.popular,
        promotion: subscription.promotion,
        badge: subscription.badge || '',
        active: subscription.active,
        maxUsers: subscription.maxUsers,
        quality: subscription.quality || '',
        devices: subscription.devices,
        downloadable: subscription.downloadable || false,
        adsSupported: subscription.adsSupported || false,
      });
    } else {
      // Auto-generate name based on product and duration
      const durationText = formData.durationType === 'days' ? 'jours' : 
                           formData.durationType === 'months' ? 'mois' : 'ans';
      setFormData(prev => ({
        ...prev,
        name: `${productName} ${prev.duration} ${durationText}`,
        description: `Abonnement ${productName} pour ${prev.duration} ${durationText}`,
        quality: 'none'
      }));
    }
  }, [subscription, productName, productId]);

  // Auto-update name when duration changes
  useEffect(() => {
    if (!subscription) {
      const durationText = formData.durationType === 'days' ? 'jour' : 
                           formData.durationType === 'months' ? 'mois' : 'an';
      const durationTextPlural = formData.durationType === 'days' ? 'jours' : 
                                 formData.durationType === 'months' ? 'mois' : 'ans';
      const finalText = formData.duration > 1 ? durationTextPlural : durationText;
      
      setFormData(prev => ({
        ...prev,
        name: `${productName} ${prev.duration} ${finalText}`,
        description: `Abonnement ${productName} pour ${prev.duration} ${finalText}`
      }));
    }
  }, [formData.duration, formData.durationType, productName, subscription]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const subscriptionData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      originalPrice: formData.originalPrice || undefined,
      maxUsers: formData.maxUsers || undefined,
      quality: formData.quality || undefined,
      devices: formData.devices || undefined,
    };

    await onSubmit(subscriptionData);
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informations de base</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'abonnement *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Duration & Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Durée et Prix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Durée *</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 1 }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="durationType">Type de durée *</Label>
              <Select value={formData.durationType} onValueChange={(value: 'days' | 'months' | 'years') => setFormData(prev => ({ ...prev, durationType: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">Jours</SelectItem>
                  <SelectItem value="months">Mois</SelectItem>
                  <SelectItem value="years">Années</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix actuel (TND) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Prix original (TND)</Label>
              <Input
                id="originalPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.originalPrice || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || 0 }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Détails du service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxUsers">Nombre d'utilisateurs</Label>
              <Input
                id="maxUsers"
                type="number"
                min="1"
                value={formData.maxUsers || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, maxUsers: parseInt(e.target.value) || undefined }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="devices">Appareils simultanés</Label>
              <Input
                id="devices"
                type="number"
                min="1"
                value={formData.devices || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, devices: parseInt(e.target.value) || undefined }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality">Qualité vidéo</Label>
            <Select value={formData.quality || 'none'} onValueChange={(value) => setFormData(prev => ({ ...prev, quality: value === 'none' ? undefined : value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la qualité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucune spécification</SelectItem>
                <SelectItem value="SD">SD (480p)</SelectItem>
                <SelectItem value="HD">HD (720p)</SelectItem>
                <SelectItem value="Full HD">Full HD (1080p)</SelectItem>
                <SelectItem value="4K">4K Ultra HD</SelectItem>
                <SelectItem value="8K">8K</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Téléchargement hors ligne</Label>
                <p className="text-sm text-muted-foreground">
                  Permet le téléchargement de contenu
                </p>
              </div>
              <Switch
                checked={formData.downloadable}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, downloadable: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Avec publicités</Label>
                <p className="text-sm text-muted-foreground">
                  Le service inclut des publicités
                </p>
              </div>
              <Switch
                checked={formData.adsSupported}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, adsSupported: checked }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Caractéristiques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder="Caractéristique de l'abonnement"
              />
              {formData.features.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addFeature}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une caractéristique
          </Button>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Paramètres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="badge">Badge (optionnel)</Label>
            <Input
              id="badge"
              value={formData.badge}
              onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
              placeholder="ex: Meilleure offre, Nouveau, etc."
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Abonnement en promotion</Label>
              <p className="text-sm text-muted-foreground">
                Afficher cet abonnement comme étant en promotion
              </p>
            </div>
            <Switch
              checked={formData.promotion}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, promotion: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Abonnement populaire</Label>
              <p className="text-sm text-muted-foreground">
                Mettre en avant cet abonnement comme populaire
              </p>
            </div>
            <Switch
              checked={formData.popular}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Abonnement actif</Label>
              <p className="text-sm text-muted-foreground">
                Afficher cet abonnement sur le site
              </p>
            </div>
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {subscription ? 'Mettre à jour' : 'Créer'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Annuler
        </Button>
      </div>
    </form>
  );
};