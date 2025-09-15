import React from 'react';
import { ShieldCheck, Plus } from 'lucide-react';
import type { RecommendationItem } from '../types';

export function AlnetResultsProcessor(result: RecommendationItem[]): React.ReactNode {
  const formatPrice = (price: number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Process the recommendations array for ALNET-specific categorization
  const netstationLicenses = result.filter((r) =>
    ['netstation_4', 'netstation_enterprise_4'].includes(r.product.id)
  );

  // Calculate total NetStation licenses
  const totalNetstationLicenses = netstationLicenses.reduce(
    (sum, license) => sum + license.quantity,
    0
  );
  const primaryNetstation = netstationLicenses[0]; // Use first one as primary for display

  const addons = result.filter(
    (r) =>
      r.product.category === 'license' &&
      !['netstation_4', 'netstation_enterprise_4'].includes(r.product.id)
  );

  return (
    <>
      {/* Base License */}
      {primaryNetstation && (
        <div>
          <h4 className="font-semibold text-secondary-900 mb-4 ml-2 text-lg flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2" />
            Pamata licence{totalNetstationLicenses > 1 ? 's' : ''}
          </h4>
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h5 className="font-medium text-gray-900">
                  {totalNetstationLicenses > 1 ? `${totalNetstationLicenses}x ` : ''}
                  {primaryNetstation.product.name}
                </h5>
                <p className="text-gray-600 text-sm">{primaryNetstation.product.description}</p>
                <p className="text-blue-600 text-sm mt-1">
                  {totalNetstationLicenses > 1
                    ? `${totalNetstationLicenses} licences nepieciešamas lielajam kameru skaitam`
                    : primaryNetstation.reason}
                </p>
                {totalNetstationLicenses > 1 && (
                  <p className="text-gray-500 text-sm mt-1">
                    Katrai licencei ir 4 pamata kanāli (kopā {totalNetstationLicenses * 4} pamata
                    kanāli)
                  </p>
                )}
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  €
                  {formatPrice(
                    netstationLicenses.reduce((sum, license) => sum + license.totalPrice, 0)
                  )}
                </p>
                {totalNetstationLicenses > 1 && (
                  <p className="text-xs text-gray-500">
                    €{formatPrice(primaryNetstation.product.basePrice)} × {totalNetstationLicenses}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add-ons */}
      {addons.length > 0 && (
        <div>
          <h4 className="font-semibold text-secondary-900 mb-4 ml-2 text-lg flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Papildu licences ({addons.length})
          </h4>
          <div className="space-y-3">
            {addons.map((addon: RecommendationItem, index: number) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-medium text-gray-900">{addon.product.name}</h5>
                    <p className="text-gray-600 text-sm">{addon.product.description}</p>
                    <p className="text-green-600 text-sm mt-1">{addon.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">€{formatPrice(addon.totalPrice)}</p>
                    {addon.quantity > 1 && (
                      <p className="text-xs text-gray-500">
                        €{formatPrice(addon.product.basePrice)} × {addon.quantity}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
