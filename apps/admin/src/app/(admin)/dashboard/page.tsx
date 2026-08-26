import { DashboardGreeting } from '@/modules/dashboard/components/DashboardGreeting';

export default function DashboardPage(): React.JSX.Element {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <DashboardGreeting />
      <p className="text-sm text-muted-foreground">
        Página de prueba del panel de administración.
      </p>
    </section>
  );
}
