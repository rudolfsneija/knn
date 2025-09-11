import type { ProductFormData, Product } from '../../types/admin';
import { ImagePreview } from './ImagePreview';
import { CategorySelector } from './CategorySelector';
import { SpecificationsEditor } from './SpecificationsEditor';

interface ProductFormProps {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
  selectedImages: FileList | null;
  setSelectedImages: React.Dispatch<React.SetStateAction<FileList | null>>;
  existingCategories: string[];
  existingSpecificationKeys: string[];
  editingProduct?: Product | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ProductForm({
  formData,
  setFormData,
  selectedImages,
  setSelectedImages,
  existingCategories,
  existingSpecificationKeys,
  editingProduct,
  onSubmit,
  onCancel,
  isSubmitting = false
}: ProductFormProps) {
  const isEditing = !!editingProduct;

  const handleFormDataChange = (field: keyof ProductFormData, value: string | boolean | Record<string, string>) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-admin-text-secondary mb-2">
              Nosaukums *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleFormDataChange('name', e.target.value)}
              className="admin-input w-full"
              disabled={isSubmitting}
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-medium text-admin-text-secondary mb-2">
              Apraksts *
            </label>
            <textarea
              required
              rows={12}
              value={formData.description}
              onChange={(e) => handleFormDataChange('description', e.target.value)}
              className="admin-input w-full resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Price and Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-admin-text-secondary mb-2">
                Cena (EUR)
              </label>
              <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*\.?[0-9]*"
                value={formData.price}
                onChange={(e) => handleFormDataChange('price', e.target.value)}
                className="admin-input w-full"
                placeholder="Cena"
                disabled={isSubmitting}
              />
            </div>

            <CategorySelector
              value={formData.category}
              existingCategories={existingCategories}
              onChange={(category) => handleFormDataChange('category', category)}
            />
          </div>

          {/* Specifications Editor */}
          <SpecificationsEditor
            specifications={formData.specifications}
            existingKeys={existingSpecificationKeys}
            subCategory={formData.sub_category}
            onSpecificationsChange={(specs) => handleFormDataChange('specifications', specs)}
            onSubCategoryChange={(subCategory) => handleFormDataChange('sub_category', subCategory)}
            disabled={isSubmitting}
          />

          {/* Checkboxes */}
          <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => handleFormDataChange('available', e.target.checked)}
                className="mr-2 h-4 w-4"
                disabled={isSubmitting}
              />
              <span className="text-sm font-medium text-admin-text-secondary">
                Pieejams
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => handleFormDataChange('featured', e.target.checked)}
                className="mr-2 h-4 w-4"
                disabled={isSubmitting}
              />
              <span className="text-sm font-medium text-admin-text-secondary">
                Izcelts produkts
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? 'Saglabā...' : (isEditing ? 'Atjaunināt' : 'Pievienot')}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Atcelt
            </button>
          </div>
        </div>

        {/* Right Column - Images */}
        <ImagePreview
          selectedImages={selectedImages}
          existingImages={editingProduct?.images}
          legacyImageUrl={editingProduct?.image_url}
          isEditing={isEditing}
          onImageChange={setSelectedImages}
        />
      </div>
    </form>
  );
}
