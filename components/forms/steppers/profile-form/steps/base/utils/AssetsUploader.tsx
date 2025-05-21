import type React from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

export const assetsSchema = z
	.array(
		z
			.instanceof(File)
			.refine(
				(file) => file.type.startsWith("image/"),
				"Asset must be an image",
			),
	)
	.min(1, "At least 1 asset required")
	.max(12, "Maximum 12 assets allowed");

import { v4 as uuidv4 } from "uuid";

type AssetItem = {
	id: string;
	file: File;
};

type AssetsUploaderProps = {
	value: AssetItem[];
	onChange: (files: AssetItem[]) => void;
	error?: string;
};

export const AssetsUploader: React.FC<AssetsUploaderProps> = ({
	value,
	onChange,
	error,
}) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const handleFiles = (files: FileList | null) => {
		if (!files) return;
		const newItems: AssetItem[] = Array.from(files)
			.filter((file) => file.type.startsWith("image/"))
			.map((file) => ({ id: uuidv4(), file }));
		// Prevent exceeding 12
		const allFiles = [...value, ...newItems].slice(0, 12);
		onChange(allFiles);
	};

	const handleRemove = (id: string) => {
		const newFiles = value.filter((item) => item.id !== id);
		onChange(newFiles);
	};

	return (
		<div>
			<label htmlFor="assets-upload" className="mb-2 block font-semibold">
				Company Assets
			</label>
			<button
				type="button"
				className="mb-2 flex flex-col items-center rounded-md border border-dashed bg-gray-50 p-4"
				onClick={() => inputRef.current?.click()}
				aria-label="Upload company assets"
			>
				<input
					id="assets-upload"
					ref={inputRef}
					type="file"
					accept="image/*"
					multiple
					className="hidden"
					onChange={(e) => handleFiles(e.target.files)}
				/>
				<span className="text-gray-400">
					Drag & drop or click to upload (1-12 images)
				</span>
			</button>
			<div className="mb-2 grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
				{value.map((asset, idx) => (
					<div
						key={asset.id}
						className="relative aspect-square w-full max-w-[120px] rounded border overflow-hidden group"
					>
						<img
							src={URL.createObjectURL(asset.file)}
							alt={`Asset ${idx + 1}`}
							className="object-cover w-full h-full"
						/>
						<button
							type="button"
							aria-label="Remove asset"
							className="absolute top-1 right-1 rounded-full bg-white p-1 text-red-500 opacity-80 hover:opacity-100"
							onClick={(e) => {
								e.stopPropagation();
								handleRemove(asset.id);
							}}
						>
							×
						</button>
					</div>
				))}
			</div>
			<div className="mb-1 text-gray-500 text-xs">
				{value.length}/12 images selected
			</div>
			{error && <p className="text-red-500 text-xs">{error}</p>}
		</div>
	);
};
