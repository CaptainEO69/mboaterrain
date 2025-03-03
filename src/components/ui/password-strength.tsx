
import { cn } from "@/lib/utils";
import { passwordStrength } from "@/lib/password-utils";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, feedback } = passwordStrength(password);

  const getColorForScore = (score: number) => {
    if (score === 0 || score === 1) return "bg-red-500";
    if (score === 2 || score === 3) return "bg-yellow-500";
    if (score === 4) return "bg-green-400";
    if (score === 5) return "bg-green-600";
    return "bg-gray-200";
  };

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={cn(
              "h-full flex-1 rounded-full transition-colors",
              score >= level ? getColorForScore(score) : "bg-gray-200"
            )}
          />
        ))}
      </div>
      <p className={cn(
        "text-xs",
        score <= 1 ? "text-red-500" : 
        score <= 3 ? "text-yellow-500" : 
        "text-green-500"
      )}>
        {feedback}
      </p>
    </div>
  );
}
