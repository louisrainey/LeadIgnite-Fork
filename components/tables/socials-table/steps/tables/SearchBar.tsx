import type React from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
	value: string;
	onChange: (value: string) => void;
	searchKey: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onChange,
	searchKey,
}) => (
	<div className="flex items-center py-4">
		<Input
			placeholder={`Search ${searchKey}...`}
			value={value}
			onChange={(event) => onChange(event.target.value)}
			className="max-w-sm"
		/>
	</div>
);

export default SearchBar;
