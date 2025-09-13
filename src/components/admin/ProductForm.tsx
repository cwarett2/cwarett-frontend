import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FileUpload } from '@/components/ui/file-upload';
import { Plus, Save, X, Trash2 } from 'lucide-react';

interface Subscription {
  name: string;
  price: number;
  promotion: boolean;
}

interface Product {
  _id?: string;
  name: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  color: string;
  popular: boolean;
  promotion: boolean;
  badge: string;
  active: boolean;
  subscriptions: Subscription[];
}

interface ProductFormProps {
  product?: Product | null;
  onSubmit: (product: Product) => Promise<void>;
  onCancel: () => void;
}

const sampleImages = {
  streaming: [
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop'
  ],
  ai: [
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop'
  ],
  tools: [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
  ],
  other: [
    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
  ]
};

const colorOptions = [
  { value: 'primary', label: 'Bleu', color: '#8B5CF6' },
  { value: 'secondary', label: 'Gris', color: '#6B7280' },
  { value: 'accent', label: 'Orange', color: '#F59E0B' },
  { value: 'success', label: 'Vert', color: '#10B981' },
  { value: 'netflix', label: 'Rouge', color: '#EF4444' },
  { value: 'destructive', label: 'Rouge foncé', color: '#DC2626' },
];

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    category: '',
    image: sampleImages.streaming[0],
    features: [''],
    color: 'primary',
    popular: false,
    promotion: false,
    badge: '',
    active: true,
    subscriptions: [{ name: 'Basic', price: 0, promotion: false }],
  });

  useEffect(() => {
    if (product) {
      setFormData({
        ...product,
        subscriptions: product.subscriptions || [{ name: 'Basic', price: 0, promotion: false }]
      });
      setUploadedImageFile(null);
    }
  }, [product]);

  useEffect(() => {
    const categoryKey = formData.category.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    const imageCategory = ['streaming', 'ai', 'tools'].includes(categoryKey) ? categoryKey : 'other';
    
    if (formData.category && sampleImages[imageCategory as keyof typeof sampleImages]) {
      if (!uploadedImageFile) {
        setFormData(prev => ({
          ...prev,
          image: sampleImages[imageCategory as keyof typeof sampleImages][0]
        }));
      }
    }
  }, [formData.category, uploadedImageFile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      features: formData.features.filter(f => f.trim() !== ''),
      subscriptions: formData.subscriptions.filter(s => s.name.trim() !== '' && s.price > 0),
    };

    await onSubmit(productData);
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

  const addSubscription = () => {
    setFormData(prev => ({
      ...prev,
      subscriptions: [...prev.subscriptions, { name: '', price: 0, promotion: false }]
    }));
  };

  const updateSubscription = (index: number, field: keyof Subscription, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      subscriptions: prev.subscriptions.map((s, i) => 
        i === index ? { ...s, [field]: value } : s
      )
    }));
  };

  const removeSubscription = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subscriptions: prev.subscriptions.filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (file: File | null, dataUrl: string) => {
    setUploadedImageFile(file);
    setFormData(prev => ({
      ...prev,
      image: dataUrl
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="ex: Netflix, PlayStation Plus, ChatGPT, etc."
                required
              />
              <p className="text-xs text-muted-foreground">
                Tapez le nom de la catégorie. Une page sera automatiquement créée pour cette catégorie.
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Image & Appearance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Image et Apparence</CardTitle>
          <p className="text-sm text-muted-foreground">
            Téléchargez une image personnalisée ou choisissez parmi nos suggestions
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div className="space-y-2">
            <Label>Télécharger une image personnalisée</Label>
            <FileUpload
              value={uploadedImageFile ? formData.image : ""}
              onChange={handleImageUpload}
              placeholder="Cliquez pour télécharger ou glissez-déposez votre image"
              maxSize={5}
            />
          </div>

          {!uploadedImageFile && (
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou choisissez une image suggérée
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">URL de l'image *</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>

              {/* Quick Image Selection */}
              <div className="space-y-2">
                <Label>Images suggérées pour {formData.category || 'cette catégorie'}</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(() => {
                    const categoryKey = formData.category.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
                    const imageCategory = ['streaming', 'ai', 'tools'].includes(categoryKey) ? categoryKey : 'other';
                    return sampleImages[imageCategory as keyof typeof sampleImages]?.map((imageUrl, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`relative h-20 rounded border-2 overflow-hidden transition-all ${
                        formData.image === imageUrl 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, image: imageUrl }))}
                    >
                      <img 
                        src={imageUrl} 
                        alt={`Option ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                    ));
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Image Preview */}
          {formData.image && (
            <div className="space-y-2">
              <Label>Aperçu de l'image</Label>
              <div className="w-full h-32 border rounded-lg overflow-hidden">
                <img 
                  src={formData.image} 
                  alt="Aperçu"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="color">Couleur du bouton</Label>
              <Select value={formData.color} onValueChange={(value) => setFormData(prev => ({ ...prev, color: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300" 
                          style={{ backgroundColor: option.color }}
                        />
                        {option.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="badge">Badge (optionnel)</Label>
            <Input
              id="badge"
              value={formData.badge}
              onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
              placeholder="ex: Populaire, Nouveau, etc."
            />
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
                placeholder="Caractéristique du produit"
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

      {/* Subscriptions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Types d'abonnements</CardTitle>
          <p className="text-sm text-muted-foreground">
            Ajoutez différents types d'abonnements avec leurs prix
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.subscriptions.map((subscription, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Nom de l'abonnement *</Label>
                  <Input
                    value={subscription.name}
                    onChange={(e) => updateSubscription(index, 'name', e.target.value)}
                    placeholder="ex: Basic, Premium, VIP"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Prix (TND) *</Label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={subscription.price}
                    onChange={(e) => updateSubscription(index, 'price', parseFloat(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="flex items-end space-x-2">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={subscription.promotion}
                      onCheckedChange={(checked) => updateSubscription(index, 'promotion', checked)}
                    />
                    <Label className="text-sm">En promotion</Label>
                  </div>
                  
                  {formData.subscriptions.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeSubscription(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addSubscription}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un type d'abonnement
          </Button>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Paramètres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Produit en promotion</Label>
              <p className="text-sm text-muted-foreground">
                Afficher ce produit comme étant en promotion
              </p>
            </div>
            <Switch
              checked={formData.promotion}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, promotion: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Produit populaire</Label>
              <p className="text-sm text-muted-foreground">
                Afficher ce produit comme populaire
              </p>
            </div>
            <Switch
              checked={formData.popular}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, popular: checked }))}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Produit actif</Label>
              <p className="text-sm text-muted-foreground">
                Afficher ce produit sur le site
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
          {product ? 'Mettre à jour' : 'Créer'}
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