import type { Product, LicenseProduct, CameraProduct } from './types';

// NetStation Licenses
export const ALNET_NETSTATION: LicenseProduct[] = [
  {
    id: 'netstation_4',
    name: 'NetStation 4',
    description: '4 kanāli',
    basePrice: 230,
    currency: 'EUR',
    category: 'license',
    licenseType: 'base',
    channelsIncluded: 4,
    maxIOLines: 0,
    requirements: ['basic_video_surveillance']
  },
  {
    id: 'ns4_channel_addon',
    name: 'NS4 One Channel Add-On',
    description: 'Papildu IP kanāls',
    basePrice: 114,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 1,
    requirements: ['additional_channels']
  },
  {
    id: 'cms_hub_256',
    name: 'CMS Hub 256',
    description: 'CMS centrs līdz 256 kamerām',
    basePrice: 0,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 256,
    requirements: ['cms_management']
  },
  {
    id: 'net_pos',
    name: 'Net Pos',
    description: 'Licence vienam kases aparātam',
    basePrice: 190,
    currency: 'EUR',
    category: 'license',
    licenseType: 'per_unit',
    requirements: ['pos_system']
  },
  {
    id: 'net_access',
    name: 'Net Access',
    description: 'Licence vienām durvīm/diviem lasītājiem',
    basePrice: 190,
    currency: 'EUR',
    category: 'license',
    licenseType: 'per_unit',
    requirements: ['access_control']
  }
];

// NetStation Enterprise Licenses
export const ALNET_NETSTATION_ENTERPRISE: LicenseProduct[] = [
  {
    id: 'netstation_enterprise_4',
    name: 'NetStation Enterprise 4',
    description: '4 kanāli, 128 I/O',
    basePrice: 360,
    currency: 'EUR',
    category: 'license',
    licenseType: 'base',
    channelsIncluded: 4,
    maxIOLines: 128,
    requirements: ['enterprise_integrations']
  },
  {
    id: 'ns_enterprise_channel_addon',
    name: 'NS Enterprise 4 One Channel Add-On',
    description: 'Papildu IP kanāls',
    basePrice: 180,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 1,
    requirements: ['additional_channels']
  },
  {
    id: 'ns_io_256',
    name: 'NS IO 256',
    description: 'Papildu 256 I/O licence',
    basePrice: 2300,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    maxIOLines: 256,
    requirements: ['high_io_count']
  },
  {
    id: 'ns_io_128',
    name: 'NS IO 128',
    description: 'Papildu 128 I/O licence',
    basePrice: 1300,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    maxIOLines: 128,
    requirements: ['additional_io']
  },
  {
    id: 'cms_hub_512',
    name: 'CMS Hub 512',
    description: 'CMS centrs līdz 512 kamerām',
    basePrice: 3300,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 512,
    requirements: ['large_camera_count']
  },
  {
    id: 'cms_hub_1024',
    name: 'CMS Hub 1024',
    description: 'CMS centrs līdz 1024 kamerām',
    basePrice: 6600,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 1024,
    requirements: ['very_large_camera_count']
  },
  {
    id: 'cms_hub_ul',
    name: 'CMS Hub UL',
    description: 'CMS centrs neierobežotam kameru skaitam',
    basePrice: 13200,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 999999,
    requirements: ['unlimited_cameras']
  }
];

// VCA Pro AI Server Options
export const ALNET_VCA_PRO: LicenseProduct[] = [
  {
    id: 'vca_pro_1ch',
    name: 'VCA PRO 1 Channel',
    description: 'AI serveris līdz 1 kanālam',
    basePrice: 400,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 1,
    requirements: ['video_analytics']
  },
  {
    id: 'vca_pro_2ch',
    name: 'VCA PRO 2 Channels',
    description: 'AI serveris līdz 2 kanāliem',
    basePrice: 600,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 2,
    requirements: ['video_analytics']
  },
  {
    id: 'vca_pro_4ch',
    name: 'VCA PRO 4 Channels',
    description: 'AI serveris līdz 4 kanāliem',
    basePrice: 850,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 4,
    requirements: ['video_analytics']
  },
  {
    id: 'vca_pro_8ch',
    name: 'VCA PRO 8 Channels',
    description: 'AI serveris līdz 8 kanāliem',
    basePrice: 1000,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 8,
    requirements: ['video_analytics']
  },
  {
    id: 'vca_pro_16ch',
    name: 'VCA PRO 16 Channels',
    description: 'AI serveris līdz 16 kanāliem',
    basePrice: 1150,
    currency: 'EUR',
    category: 'license',
    licenseType: 'addon',
    channelsIncluded: 16,
    requirements: ['video_analytics']
  }
];

// Camera Products
export const ALNET_CAMERAS: CameraProduct[] = [
  {
    id: 'fixed_camera',
    name: 'Stacionārās kameras',
    description: 'Stacionārās videonovērošanas kameras',
    basePrice: 0,
    currency: 'EUR',
    category: 'camera',
    cameraType: 'fixed_outdoor'
  },
  {
    id: 'ptz_camera_100m',
    name: 'Āra grozāmās (PTZ) līdz 100m',
    description: 'Āra grozāmas kameras ar tālummaiņu līdz 100m attālumam',
    basePrice: 0,
    currency: 'EUR',
    category: 'camera',
    cameraType: 'ptz_outdoor',
    maxDistance: 100
  },
  {
    id: 'ptz_camera_180m',
    name: 'Āra grozāmās (PTZ) līdz 180m',
    description: 'Āra grozāmas kameras ar tālummaiņu līdz 180m attālumam',
    basePrice: 0,
    currency: 'EUR',
    category: 'camera',
    cameraType: 'ptz_outdoor',
    maxDistance: 180
  },
  {
    id: 'indoor_fixed_camera',
    name: 'Iekšā stacionārās',
    description: 'Iekštelpu stacionārās videonovērošanas kameras',
    basePrice: 0,
    currency: 'EUR',
    category: 'camera',
    cameraType: 'fixed_indoor'
  },
  {
    id: 'panorama_camera',
    name: 'Iekšā/āra panorāmas',
    description: 'Panorāmas kameras iekštelpu un āra lietošanai',
    basePrice: 0,
    currency: 'EUR',
    category: 'camera',
    cameraType: 'panorama'
  }
];

// Combined product catalog
export const ALNET_PRODUCTS = {
  netstation: ALNET_NETSTATION,
  enterprise: ALNET_NETSTATION_ENTERPRISE,
  vcaPro: ALNET_VCA_PRO,
  cameras: ALNET_CAMERAS
};

// All licenses combined
export const ALL_ALNET_LICENSES = [
  ...ALNET_NETSTATION,
  ...ALNET_NETSTATION_ENTERPRISE,
  ...ALNET_VCA_PRO
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
  const allProducts = [
    ...ALNET_NETSTATION,
    ...ALNET_NETSTATION_ENTERPRISE,
    ...ALNET_VCA_PRO,
    ...ALNET_CAMERAS
  ];
  return allProducts.find(product => product.id === id);
};

export const getProductsByCategory = (category: Product['category']): Product[] => {
  const allProducts = [
    ...ALNET_NETSTATION,
    ...ALNET_NETSTATION_ENTERPRISE,
    ...ALNET_VCA_PRO,
    ...ALNET_CAMERAS
  ];
  return allProducts.filter(product => product.category === category);
};

export const getLicensesByType = (licenseType: LicenseProduct['licenseType']): LicenseProduct[] => {
  return ALL_ALNET_LICENSES.filter(license => license.licenseType === licenseType);
};

export const getCamerasByType = (cameraType: CameraProduct['cameraType']): CameraProduct[] => {
  return ALNET_CAMERAS.filter(camera => camera.cameraType === cameraType);
};

// Helper to get VCA Pro license based on channel count
export const getVcaProForChannels = (channels: number): LicenseProduct | undefined => {
  if (channels <= 1) return getProductById('vca_pro_1ch') as LicenseProduct;
  if (channels <= 2) return getProductById('vca_pro_2ch') as LicenseProduct;
  if (channels <= 4) return getProductById('vca_pro_4ch') as LicenseProduct;
  if (channels <= 8) return getProductById('vca_pro_8ch') as LicenseProduct;
  if (channels <= 16) return getProductById('vca_pro_16ch') as LicenseProduct;
  
  // For more than 16 channels, calculate multiple licenses
  return getProductById('vca_pro_16ch') as LicenseProduct;
};