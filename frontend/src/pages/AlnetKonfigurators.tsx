import { Cctv } from 'lucide-react';
import { useAlnetConfigurator } from '../hooks/useAlnetConfigurator';
import { Configurator } from '../components/configurator';

export function AlnetKonfigurators() {
  const configuratorHook = useAlnetConfigurator();

  return (
    <Configurator
      title="ALNET Konfigurators"
      subtitle="Atrodiet ideālo videonovērošanas risinājumu jūsu vajadzībām"
      icon={<Cctv className="w-16 h-16 text-primary-600 mr-4" />}
      configuratorHook={configuratorHook}
    />
  );
}
