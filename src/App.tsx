import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import MortgageCalculator from '@/components/mortgage-calculator';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="mortgage-calc-theme">
      <div className="min-h-screen bg-background">
        <main className="container mx-auto py-8 px-4">
          <h1 className="text-4xl font-bold text-center mb-8">
            Mortgage Calculator
          </h1>
          <MortgageCalculator />
        </main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;