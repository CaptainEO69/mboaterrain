
export interface DebugInfoProps {
  debugInfo: any;
}

export function DebugInfo({ debugInfo }: DebugInfoProps) {
  if (!debugInfo) return null;

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-md">
      <h3 className="text-sm font-medium mb-2">Informations de débogage:</h3>
      <pre className="text-xs overflow-auto p-2 bg-gray-200 rounded">
        {JSON.stringify(debugInfo, null, 2)}
      </pre>
    </div>
  );
}
