import type { 
  Answers, 
  BusinessRule, 
  RecommendationItem,
  LicenseProduct
} from './types';
import { getProductById } from './products';

// Helper function to calculate total cameras
const calculateTotalCameras = (answers: Answers): number => {
  const cameraTypes = answers.camera_types as string[] || [];
  let totalCameras = 0;
  
  if (cameraTypes.includes('fixed')) {
    totalCameras += (answers.fixed_cameras_quantity as number) || 0;
  }
  if (cameraTypes.includes('indoor_fixed')) {
    totalCameras += (answers.indoor_fixed_cameras_quantity as number) || 0;
  }
  if (cameraTypes.includes('ptz_100m')) {
    totalCameras += (answers.ptz_100m_quantity as number) || 0;
  }
  if (cameraTypes.includes('ptz_180m')) {
    totalCameras += (answers.ptz_180m_quantity as number) || 0;
  }
  if (cameraTypes.includes('panorama')) {
    totalCameras += (answers.panorama_cameras_quantity as number) || 0;
  }
  
  return totalCameras;
};

// Business rules for Alnet system configuration
export const ALNET_BUSINESS_RULES: BusinessRule[] = [
  {
    id: 'base_license_selection',
    name: 'Base License Selection',
    priority: 100,
    condition: (answers: Answers) => {
      const functions = answers.system_functions as string[] || [];
      const totalCameras = calculateTotalCameras(answers);
      
      // Rule 1: Base license needed if cameras OR any system functions are selected
      return totalCameras > 0 || functions.length > 0;
    },
    action: (answers: Answers): RecommendationItem[] => {
      const functions = answers.system_functions as string[] || [];
      const totalCameras = calculateTotalCameras(answers);
      
      // Rule 3: Must choose NetStation Enterprise 4 for certain functions
      // NetStation 4 does NOT support I/O - only NetStation Enterprise 4 does
      const requiresEnterprise = functions.some(func => 
        ['external_logs', 'io_control', 'building_management'].includes(func)
      );
      
      const recommendations: RecommendationItem[] = [];
      
      if (requiresEnterprise) {
        // Use NetStation Enterprise 4
        const baseLicense = getProductById('netstation_enterprise_4') as LicenseProduct;
        let reason = 'NetStation Enterprise 4 nepieciešams ';
        const reasons = [];
        
        if (functions.includes('external_logs')) reasons.push('ārējiem žurnāliem');
        if (functions.includes('io_control')) reasons.push('I/O kontrolei');
        if (functions.includes('building_management')) reasons.push('BMS integrācijai');
        
        reason += reasons.join(', ');
        
        recommendations.push({
          product: baseLicense,
          quantity: 1,
          totalPrice: baseLicense.basePrice,
          reason
        });
      } else {
        // Use regular NetStation 4
        const baseLicense = getProductById('netstation_4') as LicenseProduct;
        let reason = 'Pamata NetStation 4 licence ';
        
        if (totalCameras > 0) {
          reason += 'videonovērošanai';
        } else {
          // No cameras, but other functions selected
          const functionNames = [];
          if (functions.includes('access_control')) functionNames.push('piekļuves kontrolei');
          if (functions.includes('pos_system')) functionNames.push('POS sistēmai');
          if (functions.includes('plate_recognition')) functionNames.push('numurzīmju atpazīšanai');
          if (functions.includes('analytics')) functionNames.push('videoanalītikai');
          
          if (functionNames.length > 0) {
            reason += functionNames.join(', ');
          } else {
            reason += 'sistēmas pamatfunkcionalitātei';
          }
        }
        
        recommendations.push({
          product: baseLicense,
          quantity: 1,
          totalPrice: baseLicense.basePrice,
          reason
        });
      }
      
      return recommendations;
    }
  },

  {
    id: 'channel_addons',
    name: 'Channel Add-ons',
    priority: 99,
    condition: (answers: Answers) => {
      // Rule 2: If cameras > base channels from NetStation licenses, need channel add-ons
      const totalCameras = calculateTotalCameras(answers);
      const totalNetstationLicenses = Math.ceil(totalCameras / 128); // Each NetStation covers up to 128 cameras
      const baseChannels = totalNetstationLicenses * 4; // Each NetStation provides 4 base channels
      return totalCameras > baseChannels;
    },
    action: (answers: Answers): RecommendationItem[] => {
      const functions = answers.system_functions as string[] || [];
      const totalCameras = calculateTotalCameras(answers);
      const requiresEnterprise = functions.some(func => 
        ['external_logs', 'io_control', 'building_management'].includes(func)
      );
      
      // Calculate total NetStation licenses needed and base channels they provide
      const totalNetstationLicenses = Math.ceil(totalCameras / 128);
      const baseChannels = totalNetstationLicenses * 4;
      const additionalChannels = totalCameras - baseChannels;
      
      if (additionalChannels > 0) {
        const channelAddon = requiresEnterprise 
          ? getProductById('ns_enterprise_channel_addon') as LicenseProduct
          : getProductById('ns4_channel_addon') as LicenseProduct;
        
        return [{
          product: channelAddon,
          quantity: additionalChannels,
          totalPrice: channelAddon.basePrice * additionalChannels,
          reason: `${additionalChannels} papildu kanāli (${totalCameras} kameras)`
        }];
      }
      
      return [];
    }
  },
  
  {
    id: 'plate_recognition_channels',
    name: 'Plate Recognition Minimum Channels',
    priority: 98,
    condition: (answers: Answers) => {
      const functions = answers.system_functions as string[] || [];
      return functions.includes('plate_recognition');
    },
    action: (answers: Answers): RecommendationItem[] => {
      const totalCameras = calculateTotalCameras(answers);
      const functions = answers.system_functions as string[] || [];
      const requiresEnterprise = functions.some(func => 
        ['external_logs', 'io_control', 'building_management'].includes(func)
      );
      
      // Rule 4: Need at least 8 channels for plate recognition
      if (totalCameras < 8) {
        // Calculate NetStation licenses needed for minimum 8 channels
        const totalNetstationLicenses = Math.ceil(8 / 128); // Will be 1 for 8 channels
        const baseChannels = totalNetstationLicenses * 4; // 4 base channels from 1 license
        const additionalChannelsNeeded = Math.max(0, 8 - Math.max(totalCameras, baseChannels));
        
        if (additionalChannelsNeeded > 0) {
          const channelAddon = requiresEnterprise 
            ? getProductById('ns_enterprise_channel_addon') as LicenseProduct
            : getProductById('ns4_channel_addon') as LicenseProduct;
          
          return [{
            product: channelAddon,
            quantity: additionalChannelsNeeded,
            totalPrice: channelAddon.basePrice * additionalChannelsNeeded,
            reason: `${additionalChannelsNeeded} papildu kanāli numurzīmju atpazīšanai (minimums 8 kanāli)`
          }];
        }
      }
      
      return [];
    }
  },
  
  {
    id: 'access_control_licenses',
    name: 'Access Control Licenses',
    priority: 90,
    condition: (answers: Answers) => {
      const functions = answers.system_functions as string[] || [];
      return functions.includes('access_control');
    },
    action: (answers: Answers): RecommendationItem[] => {
      const quantity = answers.doors_quantity as number || 0;
      if (quantity <= 0) return [];
      
      const license = getProductById('net_access') as LicenseProduct;
      return [{
        product: license,
        quantity,
        totalPrice: license.basePrice * quantity,
        reason: `${quantity} Net Access licences durvīm`
      }];
    }
  },
  
  {
    id: 'pos_licenses',
    name: 'POS System Licenses',
    priority: 90,
    condition: (answers: Answers) => {
      const functions = answers.system_functions as string[] || [];
      return functions.includes('pos_system');
    },
    action: (answers: Answers): RecommendationItem[] => {
      const quantity = answers.cash_registers_quantity as number || 0;
      if (quantity <= 0) return [];
      
      const license = getProductById('net_pos') as LicenseProduct;
      return [{
        product: license,
        quantity,
        totalPrice: license.basePrice * quantity,
        reason: `${quantity} Net Pos licences kases aparātiem`
      }];
    }
  },
  
  {
    id: 'io_control_licenses',
    name: 'I/O Control Licenses',
    priority: 85,
    condition: (answers: Answers) => {
      const functions = answers.system_functions as string[] || [];
      const quantity = answers.io_devices_quantity as number || 0;
      // Only trigger for >128 I/O devices, as NetStation Enterprise 4 supports up to 128 by default
      return functions.includes('io_control') && quantity > 128;
    },
    action: (answers: Answers): RecommendationItem[] => {
      const quantity = answers.io_devices_quantity as number || 0;
      if (quantity <= 128) return []; // No additional licenses needed for ≤128 devices (NetStation Enterprise 4 supports up to 128)
      
      const recommendations: RecommendationItem[] = [];
      
      // Rule 7: For >128 I/O devices, need NS IO256 (enables up to 384 total)
      const nsIo256 = getProductById('ns_io_256') as LicenseProduct;
      recommendations.push({
        product: nsIo256,
        quantity: 1,
        totalPrice: nsIo256.basePrice,
        reason: `NS IO256 nepieciešams ${quantity} I/O ierīcēm (NetStation Enterprise 4 pamata 128 + papildu 256)`
      });
      
      // If >384, need additional NS IO 128 licenses
      if (quantity > 384) {
        const additionalDevices = quantity - 384;
        const additionalIo128Licenses = Math.ceil(additionalDevices / 128);
        const nsIo128 = getProductById('ns_io_128') as LicenseProduct;
        
        recommendations.push({
          product: nsIo128,
          quantity: additionalIo128Licenses,
          totalPrice: nsIo128.basePrice * additionalIo128Licenses,
          reason: `${additionalIo128Licenses} NS IO128 licences papildu ${additionalDevices} I/O ierīcēm`
        });
      }
      
      return recommendations;
    }
  },

  {
    id: 'multiple_netstation_licenses',
    name: 'Multiple NetStation Licenses',
    priority: 80,
    condition: (answers: Answers) => {
      // Rule 8: >128 cameras need additional NetStation licenses
      const totalCameras = calculateTotalCameras(answers);
      return totalCameras > 128;
    },
    action: (answers: Answers): RecommendationItem[] => {
      const totalCameras = calculateTotalCameras(answers);
      const functions = answers.system_functions as string[] || [];
      const requiresEnterprise = functions.some(func => 
        ['external_logs', 'io_control', 'building_management'].includes(func)
      );
      
      // Calculate total licenses needed (every 128 cameras) - first license already covered in base rule
      const totalLicensesNeeded = Math.ceil(totalCameras / 128);
      const additionalLicenses = totalLicensesNeeded - 1; // -1 because first license is already covered
      
      if (additionalLicenses > 0) {
        const baseLicense = requiresEnterprise
          ? getProductById('netstation_enterprise_4') as LicenseProduct
          : getProductById('netstation_4') as LicenseProduct;
        
        return [{
          product: baseLicense,
          quantity: additionalLicenses,
          totalPrice: baseLicense.basePrice * additionalLicenses,
          reason: `${additionalLicenses} papildu NetStation licences ${totalCameras} kamerām (katrai licencei 128 kameras)`
        }];
      }
      
      return [];
    }
  },

  {
    id: 'cms_hub_selection',
    name: 'CMS Hub Selection',
    priority: 75,
    condition: (answers: Answers) => {
      const functions = answers.system_functions as string[] || [];
      const totalCameras = calculateTotalCameras(answers);
      const totalNetstationLicenses = Math.ceil(totalCameras / 128);
      
      // Rule 9: CMS Hub required when:
      // - Centralized management functionality is selected, OR
      // - >1 NetStation license, OR 
      // - >256 cameras
      return functions.includes('centralized_management') || 
             totalNetstationLicenses > 1 || 
             totalCameras > 256;
    },
    action: (answers: Answers): RecommendationItem[] => {
      const functions = answers.system_functions as string[] || [];
      const totalCameras = calculateTotalCameras(answers);
      const totalNetstationLicenses = Math.ceil(totalCameras / 128);
      let cmsProduct: LicenseProduct;
      
      // Select CMS Hub based on camera count first, then other factors
      if (totalCameras > 1024) {
        cmsProduct = getProductById('cms_hub_ul') as LicenseProduct;
      } else if (totalCameras > 512) {
        cmsProduct = getProductById('cms_hub_1024') as LicenseProduct;
      } else if (totalCameras > 256) {
        cmsProduct = getProductById('cms_hub_512') as LicenseProduct;
      } else {
        // For ≤256 cameras, use CMS Hub 256 (free for centralized management or multiple NetStations)
        cmsProduct = getProductById('cms_hub_256') as LicenseProduct;
      }
      
      let reason: string;
      if (functions.includes('centralized_management')) {
        reason = `${cmsProduct.name} nepieciešams centralizētai lietotāju/serveru pārvaldībai`;
      } else if (totalNetstationLicenses > 1 && totalCameras <= 256) {
        reason = `${cmsProduct.name} nepieciešams ${totalNetstationLicenses} NetStation licencēm`;
      } else {
        reason = `${cmsProduct.name} nepieciešams ${totalCameras} kamerām`;
      }
      
      return [{
        product: cmsProduct,
        quantity: 1,
        totalPrice: cmsProduct.basePrice,
        reason
      }];
    }
  },

  {
    id: 'vca_pro_analytics',
    name: 'VCA Pro Analytics',
    priority: 70,
    condition: (answers: Answers) => {
      // Rule 10: Analytics functionality needs VCA PRO
      const functions = answers.system_functions as string[] || [];
      return functions.includes('video_analytics');
    },
    action: (answers: Answers): RecommendationItem[] => {
      const analyticsCameras = answers.analytics_cameras_quantity as number || 0;
      if (analyticsCameras <= 0) return [];
      
      // VCA Pro pricing depends on number of cameras
      let vcaProduct: LicenseProduct;
      
      if (analyticsCameras <= 1) {
        vcaProduct = getProductById('vca_pro_1ch') as LicenseProduct;
      } else if (analyticsCameras <= 2) {
        vcaProduct = getProductById('vca_pro_2ch') as LicenseProduct;
      } else if (analyticsCameras <= 4) {
        vcaProduct = getProductById('vca_pro_4ch') as LicenseProduct;
      } else if (analyticsCameras <= 8) {
        vcaProduct = getProductById('vca_pro_8ch') as LicenseProduct;
      } else if (analyticsCameras <= 16) {
        vcaProduct = getProductById('vca_pro_16ch') as LicenseProduct;
      } else {
        // For >16 channels, use the largest available and note that multiple may be needed
        vcaProduct = getProductById('vca_pro_16ch') as LicenseProduct;
      }
      
      return [{
        product: vcaProduct,
        quantity: 1,
        totalPrice: vcaProduct.basePrice,
        reason: `${vcaProduct.name} videoanalītikai ${analyticsCameras} kamerām`
      }];
    }
  }
];



// Main function to calculate recommendations
export function calculateRecommendations(answers: Answers): RecommendationItem[] {
  const recommendations: RecommendationItem[] = [];
  
  // Sort rules by priority (highest first)
  const sortedRules = [...ALNET_BUSINESS_RULES].sort((a, b) => b.priority - a.priority);
  
  // Execute each rule that matches its condition
  for (const rule of sortedRules) {
    if (rule.condition(answers)) {
      const ruleRecommendations = rule.action(answers);
      recommendations.push(...ruleRecommendations);
    }
  }
  
  return recommendations;
}
