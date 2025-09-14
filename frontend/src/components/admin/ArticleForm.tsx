import type { ArticleFormData, Article } from '../../types/admin';
import { ImagePreview } from './ImagePreview';

interface ArticleFormProps {
  formData: ArticleFormData;
  setFormData: React.Dispatch<React.SetStateAction<ArticleFormData>>;
  selectedImages: FileList | null;
  setSelectedImages: React.Dispatch<React.SetStateAction<FileList | null>>;
  editingArticle?: Article | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ArticleForm({
  formData,
  setFormData,
  selectedImages,
  setSelectedImages,
  editingArticle,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ArticleFormProps) {
  const isEditing = !!editingArticle;

  const handleFormDataChange = (field: keyof ArticleFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form Fields */}
        <div className="space-y-6">
          {/* Title Field */}
          <div>
            <label className="block text-sm font-medium text-admin-text-secondary mb-2">
              Virsraksts *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleFormDataChange('title', e.target.value)}
              className="admin-input w-full"
              disabled={isSubmitting}
            />
          </div>

          {/* Content Field */}
          <div>
            <label className="block text-sm font-medium text-admin-text-secondary mb-2">
              Saturs *
            </label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={(e) => handleFormDataChange('content', e.target.value)}
              className="admin-input w-full resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Excerpt Field */}
          <div>
            <label className="block text-sm font-medium text-admin-text-secondary mb-2">
              Īss apraksts
            </label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => handleFormDataChange('excerpt', e.target.value)}
              className="admin-input w-full resize-none"
              placeholder="Īss aktualitātes apraksts priekšskatījumam"
              disabled={isSubmitting}
            />
          </div>

          {/* Created At Date Field */}
          <div>
            <label className="block text-sm font-medium text-admin-text-secondary mb-2">
              Datums
            </label>
            <input
              type="date"
              value={formData.created_at}
              onChange={(e) => handleFormDataChange('created_at', e.target.value)}
              className="admin-input w-full"
              disabled={isSubmitting}
            />
            <p className="text-sm text-admin-text-secondary mt-1">
              Ja nav norādīts, tiks izmantots šodienas datums
            </p>
          </div>

          {/* Published Checkbox */}
          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => handleFormDataChange('published', e.target.checked)}
                className="mr-2 h-4 w-4"
                disabled={isSubmitting}
              />
              <span className="text-sm font-medium text-admin-text-secondary">Publicēts</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              {isSubmitting ? 'Saglabā...' : isEditing ? 'Atjaunināt' : 'Pievienot'}
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
          existingImages={editingArticle?.images}
          legacyImageUrl={editingArticle?.image_url}
          isEditing={isEditing}
          onImageChange={setSelectedImages}
        />
      </div>
    </form>
  );
}
