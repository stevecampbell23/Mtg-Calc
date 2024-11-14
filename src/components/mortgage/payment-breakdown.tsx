import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { PaymentChart } from './payment-chart';

interface PaymentBreakdownProps {
  payments: {
    mortgage: number;
    tax: number;
    insurance: number;
    total: number;
  };
  onDownload: () => void;
}

export function PaymentBreakdown({ payments, onDownload }: PaymentBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Breakdown</CardTitle>
        <CardDescription>Monthly payment breakdown and visualization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Principal & Interest</span>
            <span className="font-medium">
              ${Math.round(payments.mortgage).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Property Tax</span>
            <span className="font-medium">
              ${Math.round(payments.tax).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Home Insurance</span>
            <span className="font-medium">
              ${Math.round(payments.insurance).toLocaleString()}
            </span>
          </div>
          <div className="pt-2 border-t">
            <div className="flex justify-between">
              <span className="font-medium">Total Monthly Payment</span>
              <span className="font-bold">
                ${Math.round(payments.total).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <PaymentChart payments={payments} />

        <Button className="w-full mt-4" onClick={onDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download Report
        </Button>
      </CardContent>
    </Card>
  );
}