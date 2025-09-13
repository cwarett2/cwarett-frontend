import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Eye, 
  Trash2, 
  ShoppingCart,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

interface Order {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  service: string;
  message: string;
  status: 'en_attente' | 'en_cours' | 'terminee' | 'annulee';
  priority: 'basse' | 'normale' | 'haute' | 'urgente';
  createdAt: string;
  updatedAt: string;
}

interface OrdersListProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, newStatus: string) => void;
  onPriorityUpdate: (orderId: string, newPriority: string) => void;
  onDelete: (orderId: string) => void;
}

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

export const OrdersList = ({ orders, onStatusUpdate, onPriorityUpdate, onDelete }: OrdersListProps) => {
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

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <ShoppingCart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Aucune commande</h3>
        <p className="text-muted-foreground">
          Les commandes des clients apparaîtront ici.
        </p>
      </div>
    );
  }

  return (
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
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Statut</Label>
                          <div className="mt-1">
                            <Select 
                              value={order.status} 
                              onValueChange={(value) => onStatusUpdate(order._id, value)}
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
                              onValueChange={(value) => onPriorityUpdate(order._id, value)}
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
                  onClick={() => onDelete(order._id)}
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