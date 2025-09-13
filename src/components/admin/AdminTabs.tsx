import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, ShoppingCart } from 'lucide-react';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  productsCount: number;
  ordersCount: number;
  children: React.ReactNode;
}

export const AdminTabs = ({ 
  activeTab, 
  onTabChange, 
  productsCount, 
  ordersCount, 
  children 
}: AdminTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="products" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Produits ({productsCount})
        </TabsTrigger>
        <TabsTrigger value="orders" className="flex items-center gap-2">
          <ShoppingCart className="h-4 w-4" />
          Commandes ({ordersCount})
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};