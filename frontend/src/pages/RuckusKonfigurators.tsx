import { Wifi } from 'lucide-react';
import { useRuckusConfigurator } from '../hooks/useRuckusConfigurator';
import { Configurator } from '../components/configurator';

export function RuckusKonfigurators() {
  const configuratorHook = useRuckusConfigurator();

  return (
    <Configurator
      title="Ruckus Konfigurators"
      subtitle="Atrodiet ideālo Wi-Fi risinājumu jūsu vajadzībām"
      icon={<Wifi className="w-16 h-16 text-primary-600 mr-4" />}
      configuratorHook={configuratorHook}
    />
  );
}
