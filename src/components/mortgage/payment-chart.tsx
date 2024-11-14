import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const COLORS = ['#FF8042', '#00C49F', '#FFBB28'];

interface PaymentChartProps {
  payments: {
    mortgage: number;
    tax: number;
    insurance: number;
  };
}

export function PaymentChart({ payments }: PaymentChartProps) {
  const pieData = [
    { name: 'Principal & Interest', value: payments.mortgage },
    { name: 'Property Tax', value: payments.tax },
    { name: 'Insurance', value: payments.insurance },
  ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              `$${Math.round(value).toLocaleString()}`
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}