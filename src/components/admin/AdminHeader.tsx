import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface AdminHeaderProps {
  onAddProduct: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  children: React.ReactNode;
}

export const AdminHeader = ({ onAddProduct, isDialogOpen, setIsDialogOpen, children }: AdminHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Administration</h1>
        <p className="text-muted-foreground">Gérez vos produits et commandes</p>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={onAddProduct} className="gap-2">
            <Plus className="h-4 w-4" />
            Ajouter un produit
          </Button>
        </DialogTrigger>
        
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter un produit</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};