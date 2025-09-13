export interface Product {
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

export interface Order {
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

export const categoryOptions = [
  { value: 'streaming', label: 'Streaming & Divertissement' },
  { value: 'ai', label: 'Intelligence Artificielle' },
  { value: 'tools', label: 'Outils Professionnels' },
  { value: 'other', label: 'Autre' },
];

export const colorOptions = [
  { value: 'primary', label: 'Bleu', color: '#8B5CF6' },
  { value: 'secondary', label: 'Gris', color: '#6B7280' },
  { value: 'accent', label: 'Orange', color: '#F59E0B' },
  { value: 'success', label: 'Vert', color: '#10B981' },
  { value: 'netflix', label: 'Rouge', color: '#EF4444' },
  { value: 'destructive', label: 'Rouge foncé', color: '#DC2626' },
];

export const statusOptions = [
  { value: 'en_attente', label: 'En attente', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'en_cours', label: 'En cours', color: 'bg-blue-100 text-blue-800' },
  { value: 'terminee', label: 'Terminée', color: 'bg-green-100 text-green-800' },
  { value: 'annulee', label: 'Annulée', color: 'bg-red-100 text-red-800' },
];

export const priorityOptions = [
  { value: 'basse', label: 'Basse', color: 'bg-gray-100 text-gray-800' },
  { value: 'normale', label: 'Normale', color: 'bg-blue-100 text-blue-800' },
  { value: 'haute', label: 'Haute', color: 'bg-orange-100 text-orange-800' },
  { value: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-800' },
];