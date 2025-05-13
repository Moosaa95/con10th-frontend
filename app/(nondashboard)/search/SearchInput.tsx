import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Props {
    disabled?: boolean;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    onKeyDown?: (e: React.KeyboardEvent) => void;
    onFocus?: (e: React.FocusEvent) => void;
    onBlur?: (e: React.FocusEvent) => void;
    onClick?: (e: React.MouseEvent) => void;
    onClear?: () => void;
}

export default function SearchInput({
    disabled,
    value,
    onChange,
    placeholder = "Search for experts, services, or skills",
    className,
    onKeyDown,
    onFocus,
    onBlur,
    onClick,
    onClear
}: Props) {
    return (
        <div className="relative w-full gap-5 py-4">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-accent-color-700" />
        <Input
            placeholder={placeholder}
            disabled={disabled}
            type="text"
            className={`w-full bg-white border-gray-300 rounded-lg text-gray-900 border h-12 pl-10 ${className}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={onClick}
                />
        {onClear && <button onClick={onClear}>Clear</button>}
      </div>
    );
}