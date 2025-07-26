import { TextAreaInput } from '../ui/TextAreaInput';

interface GratitudeInputProps {
  gratitudes: string[];
  onChange: (gratitudes: string[]) => void;
  placeholder?: string;
}

export function GratitudeInput({ gratitudes, onChange, placeholder }: GratitudeInputProps) {
  const updateGratitude = (index: number, value: string) => {
    const newGratitudes = [...gratitudes];
    newGratitudes[index] = value;
    onChange(newGratitudes);
  };

  return (
    <div className="space-y-3">
      {gratitudes.map((gratitude, index) => (
        <div key={index} className="flex items-start gap-3">
          <span className="text-ink-muted font-serif mt-1">{index + 1}.</span>
          <TextAreaInput
            value={gratitude}
            onChange={(value) => updateGratitude(index, value)}
            placeholder={placeholder || "I am grateful for..."}
            className="flex-1"
          />
        </div>
      ))}
    </div>
  );
}