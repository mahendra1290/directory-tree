import { useEffect, useRef } from 'react';

interface CheckboxProps {
  label: React.ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  className?: string;
}

const Checkbox = ({
  label,
  checked = false,
  onChange,
  indeterminate,
  className,
}: CheckboxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  return (
    <div className={className}>
      <label className='flex items-center'>
        <input
          ref={inputRef}
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className='mr-2'
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
