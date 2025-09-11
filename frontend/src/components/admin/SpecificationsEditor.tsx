import { useState, useCallback } from 'react';

interface SpecificationsEditorProps {
  specifications: Record<string, string>;
  existingKeys: string[];
  subCategory: string;
  onSpecificationsChange: (specs: Record<string, string>) => void;
  onSubCategoryChange: (subCategory: string) => void;
  disabled?: boolean;
}

export function SpecificationsEditor({
  specifications,
  existingKeys,
  subCategory,
  onSpecificationsChange,
  onSubCategoryChange,
  disabled = false
}: SpecificationsEditorProps) {
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  const handleSpecificationChange = useCallback((key: string, value: string) => {
    const updatedSpecs = { ...specifications };
    if (value.trim() === '') {
      delete updatedSpecs[key];
    } else {
      updatedSpecs[key] = value;
    }
    onSpecificationsChange(updatedSpecs);
  }, [specifications, onSpecificationsChange]);

  const handleKeyChange = useCallback((oldKey: string, newKey: string) => {
    if (oldKey === newKey || newKey.trim() === '') return;
    
    const updatedSpecs = { ...specifications };
    const value = updatedSpecs[oldKey] || '';
    delete updatedSpecs[oldKey];
    updatedSpecs[newKey.trim()] = value;
    onSpecificationsChange(updatedSpecs);
  }, [specifications, onSpecificationsChange]);

  const addNewSpecification = useCallback(() => {
    if (newSpecKey.trim() === '') return;
    
    const updatedSpecs = { ...specifications };
    updatedSpecs[newSpecKey.trim()] = newSpecValue.trim();
    onSpecificationsChange(updatedSpecs);
    
    // Clear the form
    setNewSpecKey('');
    setNewSpecValue('');
  }, [specifications, newSpecKey, newSpecValue, onSpecificationsChange]);

  const addFromExisting = useCallback((existingKey: string) => {
    const updatedSpecs = { ...specifications };
    updatedSpecs[existingKey] = '';
    onSpecificationsChange(updatedSpecs);
  }, [specifications, onSpecificationsChange]);

  const removeSpecification = useCallback((key: string) => {
    const updatedSpecs = { ...specifications };
    delete updatedSpecs[key];
    onSpecificationsChange(updatedSpecs);
  }, [specifications, onSpecificationsChange]);

  const specificationEntries = Object.entries(specifications);
  const availableExistingKeys = existingKeys.filter(key => !(key in specifications));

  return (
    <div className="space-y-4">
      {/* Sub-category field */}
      <div>
        <label className="block text-sm font-medium text-admin-text-secondary mb-2">
          Apakškategorija
        </label>
        <input
          type="text"
          value={subCategory}
          onChange={(e) => onSubCategoryChange(e.target.value)}
          className="admin-input w-full"
          disabled={disabled}
        />
      </div>

      {/* Custom specifications */}
      <div>
        <label className="block text-sm font-medium text-admin-text-secondary mb-3">
          Specifikācijas
        </label>

        {/* Add new specification form */}
        <div className="bg-admin-bg-secondary p-4 rounded-lg mb-4">
          <h4 className="text-sm font-medium text-admin-text-primary mb-3">Jauna specifikāciju</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <input
                type="text"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                className="admin-input w-full text-sm"
                placeholder="Nosaukums"
                disabled={disabled}
                list="existing-spec-keys"
              />
              {/* Datalist for suggestions */}
              <datalist id="existing-spec-keys">
                {availableExistingKeys.map(key => (
                  <option key={key} value={key} />
                ))}
              </datalist>
            </div>
            
            <div>
              <input
                type="text"
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                className="admin-input w-full text-sm"
                placeholder="Vērtība"
                disabled={disabled}
              />
            </div>
            
            <div>
              <button
                type="button"
                onClick={addNewSpecification}
                disabled={disabled || newSpecKey.trim() === ''}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-md text-sm transition-colors"
              >
                Pievienot
              </button>
            </div>
          </div>

          {/* Quick add from existing keys */}
          {availableExistingKeys.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-admin-text-secondary mb-2">Vai izvēlieties no esošajām:</p>
              <div className="flex flex-wrap gap-2">
                {availableExistingKeys.slice(0, 8).map(key => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => addFromExisting(key)}
                    disabled={disabled}
                    className="text-xs bg-admin-accent-primary hover:bg-admin-accent-secondary text-white px-2 py-1 rounded transition-colors disabled:bg-gray-400"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Existing specifications list */}
        {specificationEntries.length > 0 && (
          <div className="space-y-3">
            {specificationEntries.map(([key, value], index) => (
              <div key={`spec-${index}`} className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-start p-3 rounded">
                {/* Specification Key Field */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={key}
                    onChange={(e) => handleKeyChange(key, e.target.value)}
                    className="admin-input w-full text-sm font-medium"
                    placeholder="Specifikācijas nosaukums"
                    disabled={disabled}
                  />
                </div>

                {/* Specification Value Field */}
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleSpecificationChange(key, e.target.value)}
                    className="admin-input w-full text-sm"
                    placeholder="Vērtība"
                    disabled={disabled}
                  />
                </div>

                {/* Remove Button */}
                <div className="sm:col-span-1">
                  <button
                    type="button"
                    onClick={() => removeSpecification(key)}
                    disabled={disabled}
                    className="w-full sm:w-auto px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition-colors disabled:bg-gray-400"
                  >
                    Dzēst
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {specificationEntries.length === 0 && (
          <div className="text-sm text-admin-text-secondary italic p-3 bg-admin-bg-secondary rounded-md text-center">
            Nav pievienotas specifikācijas.
          </div>
        )}
      </div>
    </div>
  );
}
