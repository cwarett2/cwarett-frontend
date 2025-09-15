import { useState, useEffect } from 'react';
import { AdminAuth, isAdminAuthenticated, adminLogout } from '@/components/AdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  Settings,
  ShoppingCart,
  Users,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Image as ImageIcon,
  Calendar,
  LogOut
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useOrders } from '@/hooks/useOrders';
import { FileUpload } from '@/components/ui/file-upload';
import axios from 'axios';
import { APP_CONFIG } from '@/config/constants';

const API_BASE_URL = APP_CONFIG.API_BASE_URL;

interface Subscription {
  name: string;
  price: number;
  promotion: boolean;
}

interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  features: string[];
  subscriptions: Subscription[];
  color: string;
  popular: boolean;
  promotion: boolean;
  badge: string;
  active: boolean;
}

// Sample image URLs for different categories
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

const statusOptions = [
  { value: 'en_attente', label: 'En attente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  { value: 'en_cours', label: 'En cours', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  { value: 'terminee', label: 'Terminée', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { value: 'annulee', label: 'Annulée', color: 'bg-red-100 text-red-800', icon: XCircle },
];

const priorityOptions = [
  { value: 'basse', label: 'Basse', color: 'bg-gray-100 text-gray-800' },
  { value: 'normale', label: 'Normale', color: 'bg-blue-100 text-blue-800' },
  { value: 'haute', label: 'Haute', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-800' },
];

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [uploadedImageFile, setUploadedImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    image: sampleImages.streaming[0],
    features: [''],
    subscriptions: [{ name: 'Basic', price: 0, promotion: false }],
    color: 'primary',
    popular: false,
    promotion: false,
    badge: '',
    active: true,
  });

  const { orders, loading: ordersLoading, updateOrder, deleteOrder } = useOrders();

  useEffect(() => {
    // Check authentication status
    const authenticated = isAdminAuthenticated();
    setIsAuthenticated(authenticated);
    setAuthLoading(false);
    
    if (authenticated) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  // Update image when category changes
  useEffect(() => {
    const categoryKey = formData.category.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    const imageCategory = ['streaming', 'ai', 'tools'].includes(categoryKey) ? categoryKey : 'other';
    
    if (formData.category && sampleImages[imageCategory as keyof typeof sampleImages]) {
      // Only update if no custom image is uploaded
      if (!uploadedImageFile) {
        setFormData(prev => ({
          ...prev,
          image: sampleImages[imageCategory as keyof typeof sampleImages][0]
        }));
      }
    }
  }, [formData.category, uploadedImageFile]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les produits",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const productData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        subscriptions: formData.subscriptions.filter(s => s.name.trim() !== '' && s.price > 0),
        originalPrice: formData.originalPrice || undefined,
      };

      if (editingProduct) {
        await axios.put(`${API_BASE_URL}/products/${editingProduct._id}`, productData);
        toast({
          title: "Succès",
          description: "Produit mis à jour avec succès",
        });
      } else {
        await axios.post(`${API_BASE_URL}/products`, productData);
        toast({
          title: "Succès",
          description: "Produit créé avec succès",
        });
      }

      fetchProducts();
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      toast({
        title: "Succès",
        description: "Produit supprimé avec succès",
      });
      fetchProducts();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setUploadedImageFile(null);
    setFormData({
      ...product,
      subscriptions: product.subscriptions || [{ name: 'Basic', price: 0, promotion: false }]
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setUploadedImageFile(null);
    setFormData({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: '',
      image: sampleImages.streaming[0],
      features: [''],
      subscriptions: [{ name: 'Basic', price: 0, promotion: false }],
      color: 'primary',
      popular: false,
      promotion: false,
      badge: '',
      active: true,
    });
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

  const handleOrderStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrder(orderId, { status: newStatus as 'en_attente' | 'en_cours' | 'terminee' | 'annulee' });
      toast({
        title: "Succès",
        description: "Statut de la commande mis à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    }
  };

  const handleOrderPriorityUpdate = async (orderId: string, newPriority: string) => {
    try {
      await updateOrder(orderId, { priority: newPriority as 'basse' | 'normale' | 'haute' | 'urgente' });
      toast({
        title: "Succès",
        description: "Priorité de la commande mise à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la priorité",
        variant: "destructive",
      });
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) return;

    try {
      await deleteOrder(orderId);
      toast({
        title: "Succès",
        description: "Commande supprimée avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la commande",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const statusOption = statusOptions.find(opt => opt.value === status);
    if (!statusOption) return null;
    
    const IconComponent = statusOption.icon;
    return (
      <Badge className={`${statusOption.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {statusOption.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityOption = priorityOptions.find(opt => opt.value === priority);
    if (!priorityOption) return null;
    
    return (
      <Badge className={priorityOption.color}>
        {priorityOption.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
    fetchProducts();
  };

  const handleLogout = () => {
    adminLogout();
    setIsAuthenticated(false);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full border-4 border-primary border-t-transparent animate-spin-slow shadow-lg mb-4" />
          <p className="text-muted-foreground text-lg">Vérification des permissions...</p>
        </div>
      </div>
    );
  }

  // Show authentication form if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  if (loading || ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Administration</h1>
            <p className="text-muted-foreground">Gérez vos produits et commandes</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" />
            Se déconnecter
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Produits ({products.length})
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Commandes ({orders.length})
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-end">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter un produit
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct ? 'Modifier le produit' : 'Ajouter un produit'}
                    </DialogTitle>
                  </DialogHeader>
                  
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
                        {editingProduct ? 'Mettre à jour' : 'Créer'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Products Grid */}
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
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    
                    {/* Show subscription count */}
                    <div className="text-sm">
                      <span className="font-medium text-primary">
                        {product.subscriptions?.length || 0} abonnement{(product.subscriptions?.length || 0) > 1 ? 's' : ''}
                      </span>
                      {product.subscriptions?.length > 0 && (
                        <div className="text-xs text-muted-foreground mt-1">
                          À partir de {Math.min(...product.subscriptions.map(s => s.price))} TND
                        </div>
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
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(product._id!)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Aucun produit</h3>
                <p className="text-muted-foreground mb-4">
                  Commencez par ajouter votre premier produit.
                </p>
                <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un produit
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Aucune commande</h3>
                <p className="text-muted-foreground">
                  Les commandes des clients apparaîtront ici.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {orders.map((order) => (
                  <Card key={order._id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h3 className="font-semibold text-lg">{order.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {order.phone} {order.email && `• ${order.email}`}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusBadge(order.status)}
                              {getPriorityBadge(order.priority)}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Service demandé</p>
                              <p className="font-medium">{order.service}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Date de commande</p>
                              <p className="font-medium">{formatDate(order.createdAt)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Méthode de paiement</p>
                              <div className="flex items-center space-x-2">
                                {order.paymentMethod === 'd17' && (
                                  <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                                    D17
                                  </Badge>
                                )}
                                {order.paymentMethod === 'flouci' && (
                                  <Badge className="bg-green-100 text-green-800 border-green-300">
                                    Flouci
                                  </Badge>
                                )}
                                {order.paymentMethod === 'virement' && (
                                  <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                                    Virement bancaire
                                  </Badge>
                                )}
                                {!order.paymentMethod && (
                                  <Badge variant="outline">
                                    Non spécifié
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {order.message && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Message</p>
                              <p className="text-sm bg-muted p-2 rounded">{order.message}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Détails de la commande</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Nom complet</Label>
                                    <p className="font-medium">{order.name}</p>
                                  </div>
                                  <div>
                                    <Label>Téléphone</Label>
                                    <p className="font-medium">{order.phone}</p>
                                  </div>
                                  {order.email && (
                                    <div>
                                      <Label>Email</Label>
                                      <p className="font-medium">{order.email}</p>
                                    </div>
                                  )}
                                  <div>
                                    <Label>Service</Label>
                                    <p className="font-medium">{order.service}</p>
                                  </div>
                                  <div>
                                    <Label>Méthode de paiement</Label>
                                    <div className="flex items-center space-x-2 mt-1">
                                      {order.paymentMethod === 'd17' && (
                                        <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                                          D17 - Dinars électroniques
                                        </Badge>
                                      )}
                                      {order.paymentMethod === 'flouci' && (
                                        <Badge className="bg-green-100 text-green-800 border-green-300">
                                          Flouci - Paiement mobile
                                        </Badge>
                                      )}
                                      {order.paymentMethod === 'virement' && (
                                        <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                                          Virement bancaire
                                        </Badge>
                                      )}
                                      {!order.paymentMethod && (
                                        <Badge variant="outline">
                                          Non spécifié
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Statut</Label>
                                    <div className="mt-1">
                                      <Select 
                                        value={order.status} 
                                        onValueChange={(value) => handleOrderStatusUpdate(order._id, value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {statusOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                              {option.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Priorité</Label>
                                    <div className="mt-1">
                                      <Select 
                                        value={order.priority} 
                                        onValueChange={(value) => handleOrderPriorityUpdate(order._id, value)}
                                      >
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {priorityOptions.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                              {option.label}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                                
                                {order.message && (
                                  <div>
                                    <Label>Message du client</Label>
                                    <div className="mt-1 p-3 bg-muted rounded-md">
                                      <p>{order.message}</p>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                                  <div>
                                    <Label>Créée le</Label>
                                    <p>{formatDate(order.createdAt)}</p>
                                  </div>
                                  <div>
                                    <Label>Modifiée le</Label>
                                    <p>{formatDate(order.updatedAt)}</p>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteOrder(order._id)}
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
