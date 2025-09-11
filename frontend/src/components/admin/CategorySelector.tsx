import { useState } from 'react';

interface CategorySelectorProps {
  value: string;
  existingCategories: string[];
  onChange: (category: string) => void;
}

export function CategorySelector({ value, existingCategories, onChange }: CategorySelectorProps) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === 'new') {
      setShowInput(true);
      setInputValue('');
      onChange('');
    } else {
      setShowInput(false);
      onChange(selectedValue);
    }
  };

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    onChange(newValue);
  };

  // Check if current value exists in categories or if we should show input
  const shouldShowInput = showInput || (value && !existingCategories.includes(value));

  return (
    <div>
      <label className="block text-sm font-medium text-admin-text-secondary mb-2">
        Kategorija
      </label>
      {existingCategories.length > 0 ? (
        <div className="space-y-2">
          <select
            value={shouldShowInput ? 'new' : value}
            onChange={(e) => handleSelectChange(e.target.value)}
            className="admin-input w-full"
          >
            <option value="">-- Izvēlieties kategoriju --</option>
            {existingCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
            <option value="new">+ Pievienot jaunu kategoriju</option>
          </select>
          {shouldShowInput && (
            <input
              type="text"
              value={inputValue || value}
              onChange={(e) => handleInputChange(e.target.value)}
              className="admin-input w-full"
              placeholder="Ievadiet jaunu kategoriju"
              autoFocus
            />
          )}
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input w-full"
          placeholder="Produkta kategorija"
        />
      )}
    </div>
  );
}
