interface FormGroupProps {
  children: React.ReactNode;
  error?: string;
}

export function FormGroup({ children, error }: FormGroupProps) {
  return (
    <div className="space-y-1">
      <div className="space-y-2">{children}</div>
      {error && <span className="text-destructive text-xs">{error}</span>}
    </div>
  );
}
