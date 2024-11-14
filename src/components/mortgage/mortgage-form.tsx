import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { InputField } from './input-field';
import { MortgageDetails } from './types';

interface MortgageFormProps {
  details: MortgageDetails;
  onDetailsChange: (details: MortgageDetails) => void;
}

export function MortgageForm({ details, onDetailsChange }: MortgageFormProps) {
  const handleChange = (field: keyof MortgageDetails, value: number) => {
    onDetailsChange({ ...details, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Details</CardTitle>
        <CardDescription>
          Enter your mortgage details below to calculate your monthly payments.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <InputField
          id="homePrice"
          label="Home Price"
          value={details.homePrice}
          onChange={(value) => handleChange('homePrice', value)}
          showDollarSign
        />

        <div className="space-y-2">
          <InputField
            id="downPayment"
            label="Down Payment"
            value={details.downPayment}
            onChange={(value) => handleChange('downPayment', value)}
            showDollarSign
          />
          <div className="flex items-center space-x-2">
            <Slider
              value={[(details.downPayment / details.homePrice) * 100]}
              onValueChange={(value) =>
                handleChange('downPayment', (details.homePrice * value[0]) / 100)
              }
              max={100}
              step={1}
            />
            <span className="w-12 text-sm">
              {Math.round((details.downPayment / details.homePrice) * 100)}%
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Select
            value={details.loanTerm.toString()}
            onValueChange={(value) => handleChange('loanTerm', Number(value))}
          >
            <SelectTrigger id="loanTerm">
              <SelectValue placeholder="Select term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 years</SelectItem>
              <SelectItem value="20">20 years</SelectItem>
              <SelectItem value="30">30 years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <InputField
          id="interestRate"
          label="Interest Rate (%)"
          value={details.interestRate}
          onChange={(value) => handleChange('interestRate', value)}
          step="0.1"
        />

        <InputField
          id="propertyTax"
          label="Annual Property Tax"
          value={details.propertyTax}
          onChange={(value) => handleChange('propertyTax', value)}
          showDollarSign
        />

        <InputField
          id="homeInsurance"
          label="Annual Home Insurance"
          value={details.homeInsurance}
          onChange={(value) => handleChange('homeInsurance', value)}
          showDollarSign
        />
      </CardContent>
    </Card>
  );
}