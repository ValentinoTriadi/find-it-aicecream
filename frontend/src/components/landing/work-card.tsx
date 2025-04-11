import { Check } from 'lucide-react';

export interface WorkCardProps {
  step: number;
  title: string;
  description: string;
  features: string[];
}

export const WorkCard: React.FC<WorkCardProps> = ({
  step,
  title,
  description,
  features,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        <span className="text-xl font-bold text-dark-blue">{step}</span>
      </div>
      <h3 className="text-xl font-bold text-dark-blue mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-stronger-blue mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
