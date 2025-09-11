import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import type { Product, ProductFormData } from '../../types/admin';
import { useProductOperations } from '../../hooks/useProductOperations';
import { AdminHeader, ProductForm, ProductList } from '../../components/admin';

export function AdminPreces() {
  const { user, logout } = useAuth();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  
  // Product operations hook
  const {
    products,
    categories,
    specificationKeys,
    loading,
    loadingCategories,
    error,
    existingCategories,
    fetchCategories,
    fetchSpecificationKeys,
    fetchProducts,
    saveProduct,
    deleteProduct,
    setError
  } = useProductOperations();

  // Category and form state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    description: '',
    price: '',
    category: '',
    sub_category: '',
    specifications: {},
    available: true,
    featured: false
  });
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);

  // Set admin theme when component mounts
  useEffect(() => {
    try {
      setTheme('admin');
    } catch (err) {
      console.error('Error setting theme:', err);
    }
  }, [setTheme]);

  // Initialize categories and specification keys when user is available
  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      return;
    }
    fetchCategories();
    fetchSpecificationKeys();
  }, [user, navigate, fetchCategories, fetchSpecificationKeys]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveProduct(formData, selectedImages, editingProduct?.id);
      resetForm();
      
      // If we're in a category view, refresh the products for that category
      if (selectedCategory) {
        fetchProducts(selectedCategory);
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Kļūda saglabājot produktu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price?.toString() || '',
      category: product.category || '',
      sub_category: product.sub_category || '',
      specifications: product.specifications || {},
      available: product.available,
      featured: product.featured
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      
      // Always refresh the current view
      if (selectedCategory) {
        // Stay in the selected category and refresh its products
        fetchProducts(selectedCategory);
      } else {
        // If we're in the categories view, refresh categories
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Kļūda dzēšot produktu');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      sub_category: '',
      specifications: {},
      available: true,
      featured: false
    });
    setSelectedImages(null);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowForm(false); // Close form when switching categories
    fetchProducts(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-admin-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-accent-primary mx-auto mb-4"></div>
          <p className="text-admin-text-secondary">Notiek autentifikācija...</p>
        </div>
      </div>
    );
  }

  if (loadingCategories) {
    return (
      <div className="min-h-screen bg-admin-bg-primary flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-admin-accent-primary mx-auto mb-4"></div>
          <p className="text-admin-text-secondary">Ielādē kategorijas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-admin-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Kļūda: {error}</p>
          <button
            onClick={() => {
              setError(null);
              navigate('/admin');
            }}
            className="admin-button-primary"
          >
            Atgriezties uz paneli
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-admin-bg-primary">
      <AdminHeader title="Produkti" onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Show categories if no category is selected */}
        {!selectedCategory && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-admin-text-primary">Izvēlieties kategoriju</h2>
              <button
                onClick={() => setShowForm(true)}
                className="admin-button-primary"
              >
                Pievienot jaunu produktu
              </button>
            </div>

            {categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="admin-card p-8 text-center transition-all duration-200 hover:shadow-lg hover:scale-105 group border-2 border-admin-border hover:border-admin-accent-primary"
                  >
                    <div className="text-2xl font-bold text-admin-text-primary group-hover:text-admin-accent-primary transition-colors">
                      {category}
                    </div>
                    <div className="mt-2 text-admin-text-secondary group-hover:text-admin-accent-primary">
                      Pārvaldīt produktus →
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="admin-card p-8 text-center">
                <p className="text-admin-text-secondary text-lg">
                  Nav pieejamas produktu kategorijas.
                </p>
                <p className="text-admin-text-secondary mt-2">
                  Pievienojiet pirmo produktu, lai izveidotu kategoriju.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Show selected category products */}
        {selectedCategory && (
          <div>
            {/* Back button and category title */}
            <div className="mb-8">
              <button
                onClick={handleBackToCategories}
                className="inline-flex items-center text-admin-accent-primary hover:text-admin-accent-secondary font-medium mb-4"
              >
                ← Atpakaļ uz kategorijām
              </button>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-admin-text-primary">
                  Kategorija: {selectedCategory}
                </h2>
                <button
                  onClick={() => {
                    setFormData({ ...formData, category: selectedCategory, sub_category: '' });
                    setShowForm(true);
                  }}
                  className="admin-button-primary"
                >
                  Pievienot produktu šajā kategorijā
                </button>
              </div>
            </div>

            {/* Products List for selected category */}
            <ProductList
              products={products}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {/* Add/Edit Form Modal-like overlay */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-admin-bg-secondary rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="admin-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-admin-text-primary">
                    {editingProduct ? 'Rediģēt produktu' : 'Pievienot jaunu produktu'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-admin-text-secondary hover:text-admin-text-primary transition-colors text-2xl"
                  >
                    ×
                  </button>
                </div>

                <ProductForm
                  formData={formData}
                  setFormData={setFormData}
                  selectedImages={selectedImages}
                  setSelectedImages={setSelectedImages}
                  existingCategories={existingCategories}
                  existingSpecificationKeys={specificationKeys}
                  editingProduct={editingProduct}
                  onSubmit={handleSubmit}
                  onCancel={resetForm}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}