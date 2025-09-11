import type { Product } from '../../types/admin';

interface ProductListItemProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export function ProductListItem({ product, onEdit, onDelete }: ProductListItemProps) {
  const handleDelete = () => {
    if (window.confirm('Vai tiešām vēlaties dzēst šo preci?')) {
      onDelete(product.id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Product Image */}
        {(product.main_image || product.image_url) && (
          <div className="w-full lg:w-36 h-36 flex-shrink-0">
            <img
              src={product.main_image?.url || product.image_url}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg border-2 border-admin-border"
            />
          </div>
        )}
        
        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h4 className="text-xl font-semibold text-admin-text-primary truncate">
                  {product.name}
                </h4>
                {product.price !== undefined && product.price !== null && (
                  <span className="text-2xl font-bold text-admin-accent-success">
                    €{product.price.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {product.available ? (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                    Pieejams
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
                    Nav pieejams
                  </span>
                )}
                {product.featured && (
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium">
                    Izcelts
                  </span>
                )}
                {product.category && (
                  <span className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                )}
                {product.sub_category && (
                  <span className="bg-gray-50 text-gray-600 text-sm px-3 py-1 rounded-full">
                    {product.sub_category}
                  </span>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex space-x-3 flex-shrink-0">
              <button
                onClick={() => onEdit(product)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Rediģēt
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Dzēst
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <p className="text-admin-text-secondary leading-relaxed">
              {product.description.length > 300
                ? `${product.description.substring(0, 200)}...`
                : product.description}
            </p>
            
            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="bg-admin-bg-secondary p-4 rounded-lg border border-admin-border">
                {/* <h5 className="text-sm font-medium text-admin-text-secondary mb-2">Specifikācijas:</h5> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-start gap-2">
                      <span className="text-admin-text-secondary font-medium min-w-0 shrink-0">{key}:</span>
                      <span className="text-admin-text-primary min-w-0 break-words">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-admin-text-secondary">
              <span>
                {new Date(product.created_at).toLocaleDateString('lv-LV')}
              </span>
              {product.images && product.images.length > 0 && (
                <span>
                  {product.images.length} attēl{product.images.length === 1 ? 's' : 'i'}
                </span>
              )}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <span>
                  {Object.keys(product.specifications).length} specifikācij{Object.keys(product.specifications).length === 1 ? 'a' : 'as'}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
