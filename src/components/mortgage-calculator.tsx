import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { MortgageForm } from './mortgage/mortgage-form';
import { PaymentBreakdown } from './mortgage/payment-breakdown';
import { MortgageDetails } from './mortgage/types';

const initialState: MortgageDetails = {
  homePrice: 300000,
  downPayment: 60000,
  loanTerm: 30,
  interestRate: 3.5,
  propertyTax: 2400,
  homeInsurance: 1000,
};

export default function MortgageCalculator() {
  const [details, setDetails] = useState<MortgageDetails>(initialState);
  const { toast } = useToast();

  const calculateMonthlyPayment = () => {
    const principal = details.homePrice - details.downPayment;
    const monthlyRate = details.interestRate / 100 / 12;
    const numberOfPayments = details.loanTerm * 12;

    const monthlyMortgage =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const monthlyPropertyTax = details.propertyTax / 12;
    const monthlyInsurance = details.homeInsurance / 12;

    return {
      mortgage: monthlyMortgage,
      tax: monthlyPropertyTax,
      insurance: monthlyInsurance,
      total: monthlyMortgage + monthlyPropertyTax + monthlyInsurance,
    };
  };

  const handleDownload = () => {
    toast({
      title: 'Report Generated',
      description: 'Your mortgage calculation report has been downloaded.',
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator">
          <div className="grid gap-6 md:grid-cols-2">
            <MortgageForm details={details} onDetailsChange={setDetails} />
            <PaymentBreakdown
              payments={calculateMonthlyPayment()}
              onDownload={handleDownload}
            />
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
              <CardDescription>
                Coming soon: PMI calculator, bi-weekly payments, and more.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <PieChartIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">
                    Advanced Features Coming Soon
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We're working on adding PMI calculations, amortization schedules,
                    and comparison tools.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}