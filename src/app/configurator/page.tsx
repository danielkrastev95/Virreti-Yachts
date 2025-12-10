import { Configurator } from "@/components/configurator";

export const metadata = {
  title: "Configurador | Virreti Yachts",
  description: "Diseña tu yate Virreti a medida. Elige modelo, color, motorización y extras.",
};

export default function ConfiguratorPage() {
  return (
    <main>
      <Configurator />
    </main>
  );
}
