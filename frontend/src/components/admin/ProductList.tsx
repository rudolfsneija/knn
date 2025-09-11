import type { Product } from '../../types/admin';
import { ProductListItem } from './ProductListItem';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductList({ products, loading, onEdit, onDelete }: ProductListProps) {
  if (loading) {
    return (
      <div className="admin-card">
        <div className="p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-accent-success mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-card">
      <div className="px-6 py-4 border-b border-admin-border">
        <h3 className="text-lg font-medium text-admin-text-primary">
          Esošie produkti ({products.length})
        </h3>
      </div>

      {products.length === 0 ? (
        <div className="p-6 text-center text-admin-text-secondary">
          Nav pievienots neviens produkts
        </div>
      ) : (
        <div className="divide-y divide-admin-border">
          {products.map((product) => (
            <ProductListItem
              key={product.id}
              product={product}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
