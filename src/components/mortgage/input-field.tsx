import { DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  type?: string;
  step?: string;
  showDollarSign?: boolean;
}

export function InputField({
  id,
  label,
  value,
  onChange,
  type = 'number',
  step,
  showDollarSign = false,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {showDollarSign && (
          <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        )}
        <Input
          id={id}
          type={type}
          className={showDollarSign ? 'pl-8' : ''}
          value={value}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}