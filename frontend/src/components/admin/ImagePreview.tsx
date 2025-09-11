import { useEffect } from 'react';
import type { ProductImage } from '../../types/admin';

interface ImagePreviewProps {
  selectedImages: FileList | null;
  existingImages?: ProductImage[];
  legacyImageUrl?: string;
  isEditing: boolean;
  onImageChange?: (files: FileList | null) => void;
}

export function ImagePreview({ selectedImages, existingImages, legacyImageUrl, isEditing, onImageChange }: ImagePreviewProps) {
  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (selectedImages) {
        Array.from(selectedImages).forEach(file => {
          URL.revokeObjectURL(URL.createObjectURL(file));
        });
      }
    };
  }, [selectedImages]);

  return (
    <div className="space-y-6">
      {/* File Input */}
      <div>
        <label className="block text-sm font-medium text-admin-text-secondary mb-2">
          Attēli
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onImageChange?.(e.target.files)}
          className="admin-input"
        />
        <p className="text-sm text-admin-text-secondary mt-1">
          Var izvēlēties vairākus attēlus. Pirmais būs galvenais attēls.
        </p>
      </div>
      
      {/* Selected Images Preview */}
      {selectedImages && selectedImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-admin-text-secondary mb-3">
            Izvēlētie attēli:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from(selectedImages).map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-admin-border">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                {index === 0 && (
                  <span className="absolute top-2 left-2 bg-admin-accent-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    Galvenais
                  </span>
                )}
                <p className="text-xs text-admin-text-secondary mt-2 truncate px-1">
                  {file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Images Preview for Edit Mode */}
      {isEditing && existingImages && existingImages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-admin-text-secondary mb-3">
            Esošie attēli:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {existingImages.map((image, index) => (
              <div key={image.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-admin-border">
                  <img
                    src={image.url}
                    alt={`Existing ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                {image.is_main && (
                  <span className="absolute top-2 left-2 bg-admin-accent-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                    Galvenais
                  </span>
                )}
                <p className="text-xs text-admin-text-secondary mt-2 truncate px-1">
                  {image.original_name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legacy image_url Preview for Edit Mode */}
      {isEditing && legacyImageUrl && (!existingImages || existingImages.length === 0) && (
        <div>
          <h4 className="text-sm font-medium text-admin-text-secondary mb-3">
            Esošais attēls (legacy):
          </h4>
          <div className="aspect-square rounded-lg overflow-hidden border-2 border-admin-border max-w-xs">
            <img
              src={legacyImageUrl}
              alt="Legacy image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}
