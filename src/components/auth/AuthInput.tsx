interface AuthInputProps {
  label: string;
  value: any;
  type?: 'text' | 'email' | 'password';
  required?: boolean;
  noteRenderWhen?: boolean;
  onChange: (newValue: any) => void;
}

export function AuthInput({ label, value, type, required, noteRenderWhen, onChange }: AuthInputProps) {
  return noteRenderWhen ? null : (
    <div className={`flex flex-col mt-4`}>
      <label>{label}</label>
      <input
        type={type ?? 'text'}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        className={`
          px-4 py-3 rounded-lg bg-gray-200 mt-2
          border focus:border-blue-500 focus:bg-white
          focus:outline-none
        `}
      />
    </div>
  )
}