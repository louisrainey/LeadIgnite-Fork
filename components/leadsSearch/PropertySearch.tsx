import { Button } from "@/components/ui/button";
import {
	calculateCenter,
	mockFetchAddressesFromApi,
} from "@/constants/utility/maps";
import { usePropertyStore } from "@/lib/stores/leadSearch/drawer";
// * Import mock property data generator
import type { Coordinate, MapFormSchemaType } from "@/types/_dashboard/maps";
import { mapFormSchema } from "@/types/zod/propertyList";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
// * PropertySearch.tsx
// ! Main property search component combining all subcomponents for the leads search feature
import React, { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { campaignSteps } from "@/_tests/tours/campaignTour";
import AdvancedFiltersDialog from "./steps/AdvancedFiltersDialog";
import { mockUserProfile } from "@/constants/_faker/profile/userProfile";
import HelpModal from "./steps/HelpModal";
import LeadSearchForm from "./steps/LeadSearchForm";
import LeadSearchHeader from "./steps/LeadSearchHeader";
import MapSection from "./steps/MapSection";
import PropertiesList from "./propertyList";
import WalkThroughModal from "../reusables/tutorials/walkthroughModal";
// ! Use named import, not default
import { generateFakeProperties } from "@/constants/dashboard/properties";

const normalizeFormValues = (values: unknown): unknown => {
	if (typeof values !== "object" || values === null) return values;
	if (Array.isArray(values)) return values.map(normalizeFormValues);
	return Object.entries(values).reduce(
		(acc, [key, value]) => {
			acc[key] = value === "" ? undefined : normalizeFormValues(value);
			return acc;
		},
		{} as Record<string, unknown>,
	);
};
const PropertySearch: React.FC = () => {
	// * Debug: log form state every render
	const formRef = React.useRef<any>(null);
	const [hasResults, setHasResults] = useState(false);
	const { properties, setProperties, isDrawerOpen, setIsDrawerOpen } =
		usePropertyStore();

	// * Set default properties on mount
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		// ! Populate with mock properties initially (replace with API call in production)
		setProperties(generateFakeProperties(12));
		// * Do NOT open the drawer on initial load
	}, []);
	const [showAdvanced, setShowAdvanced] = useState(false);
	const [isTourOpen, setIsTourOpen] = useState(false);
	const [showAllErrors, setShowAllErrors] = React.useState(true);

	const [center, setCenter] = useState<Coordinate>({
		lat: 39.7392,
		lng: -104.9903,
	});
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleStartTour = () => setIsTourOpen(true);
	const handleCloseTour = () => setIsTourOpen(false);
	const [markers, setMarkers] = useState<Coordinate[]>([
		{ lat: 39.7392, lng: -104.9903 },
		{ lat: 39.7294, lng: -104.8319 },
	]);
	const [drawingMode, setDrawingMode] =
		useState<google.maps.drawing.OverlayType | null>(null);
	const [shapeDrawn, setShapeDrawn] = useState(false);
	const [boundaryApplied, setBoundaryApplied] = useState(false);
	const shapeRef = useRef<
		| google.maps.Polygon
		| google.maps.Rectangle
		| google.maps.Circle
		| google.maps.Polyline
		| null
	>(null);

	const clearShape = () => {
		if (shapeRef.current) {
			shapeRef.current.setMap(null);
			shapeRef.current = null;
		}
	};

	const handleDrawPolygon = () => {
		if (shapeDrawn && !boundaryApplied) handleCancelDrawing();
		setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	};
	const handleDrawRectangle = () => {
		if (shapeDrawn && !boundaryApplied) handleCancelDrawing();
		setDrawingMode(google.maps.drawing.OverlayType.RECTANGLE);
	};
	const handleDrawCircle = () => {
		if (shapeDrawn && !boundaryApplied) handleCancelDrawing();
		setDrawingMode(google.maps.drawing.OverlayType.CIRCLE);
	};
	const handleDrawPolyline = () => {
		if (shapeDrawn && !boundaryApplied) handleCancelDrawing();
		setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
	};

	const handleCancelDrawing = () => {
		clearShape();
		setDrawingMode(null);
		setShapeDrawn(false);
	};

	const handleApplyDrawing = () => {
		if (!shapeRef.current) return;
		setBoundaryApplied(true);
		setShapeDrawn(false);
		// Optionally: filter properties based on shapeRef.current
	};

	const handleRemoveBoundaries = () => {
		clearShape();
		setBoundaryApplied(false);
		// Optionally: reset property filters
	};

	const handleShapeComplete = (
		shape:
			| google.maps.Polygon
			| google.maps.Rectangle
			| google.maps.Circle
			| google.maps.Polyline,
	) => {
		clearShape();
		shapeRef.current = shape;
		setDrawingMode(null);
		setShapeDrawn(true);
	};
	const handleOpenModal = () => setIsModalOpen(true);
	const handleCloseModal = () => setIsModalOpen(false);

	// moved above useEffect to avoid usage-before-declaration
	// const { properties, setProperties } = usePropertyStore();

	const {
		control,
		handleSubmit,

		formState: { errors, isValid },
		getValues,
	} = useForm<MapFormSchemaType>({
		resolver: zodResolver(mapFormSchema),
		mode: "onChange", // * Enable real-time validation
		defaultValues: {
			location: "",
			marketStatus: undefined,
			beds: undefined,
			baths: undefined,
			propertyType: undefined,
			advanced: {
				radius: undefined,
				pastDays: undefined,
				dateFrom: undefined,
				dateTo: undefined,
				mlsOnly: false,
				foreclosure: false,
				proxy: undefined,
				extraPropertyData: false,
				excludePending: false,
				limit: undefined,
			},
		},
	});

	const onSubmit = async (data: MapFormSchemaType) => {
		// If form is invalid, show all errors
		if (!isValid) {
			setShowAllErrors(true);
			return;
		}
		const normalizedData = normalizeFormValues(data);
		console.log("[DEBUG] onSubmit normalizedData:", normalizedData);

		console.log("[DEBUG] onSubmit called with data:", data); // *
		toast("Submitted");
		const fetchedCoordinates = await mockFetchAddressesFromApi([data.location]);
		console.log("[DEBUG] fetchedCoordinates:", fetchedCoordinates); // *
		const newMarkers = fetchedCoordinates.map((coord) => ({
			lat: coord.lat,
			lng: coord.lng,
		}));
		console.log("[DEBUG] newMarkers:", newMarkers); // *
		if (newMarkers && newMarkers.length > 0) {
			setMarkers(newMarkers);
			const newCenter = calculateCenter(newMarkers);
			console.log("[DEBUG] newCenter:", newCenter); // *
			setCenter(newCenter);
		}
		// * Set new properties after search
		const newProperties = generateFakeProperties(12); // Replace with real API call in prod
		console.log("[DEBUG] newProperties:", newProperties); // *
		setProperties(newProperties);
		setHasResults(newProperties.length > 0);
		console.log("[DEBUG] hasResults:", newProperties.length > 0); // *
		// Do NOT open the drawer here
	};

	return (
		<div className="container mx-auto py-6">
			<LeadSearchHeader
				onHelpClick={handleOpenModal}
				title="Leads Search"
				description="Quickly search for properties by location, filters, and more."
				creditsRemaining={
					mockUserProfile.subscription.aiCredits.allotted -
					mockUserProfile.subscription.aiCredits.used
				}
			/>
			<form
				onSubmit={handleSubmit(onSubmit, (errors) => {
					console.log("[DEBUG] Form validation errors:", errors);
				})}
			>
				<LeadSearchForm
					control={control}
					errors={errors}
					onAdvancedOpen={() => setShowAdvanced(true)}
				/>

				{/* Show validation errors above the Search button if form is invalid */}
				{!isValid && Object.keys(errors).length > 0 && (
					<div className="mb-2 rounded border border-red-300 bg-red-50 p-3 text-red-700 text-sm">
						<strong>Fix the following fields:</strong>
						<ul className="mt-1 ml-5 list-disc">
							{Object.entries(errors).map(([field, error]) => (
								<li key={field}>
									{field.charAt(0).toUpperCase() + field.slice(1)}:{" "}
									{error?.message || (error as any)?.root?.message}
								</li>
							))}
						</ul>
					</div>
				)}
				<div className="my-4 flex justify-center">
					<Button
						type="submit"
						className="w-full max-w-xs gap-2 md:w-auto"
						disabled={!isValid}
					>
						<Search className="h-4 w-4" /> Search
					</Button>
				</div>
				{/* Show 'Show Results' button only when there are valid mock properties */}
				{hasResults && properties && properties.length > 0 && (
					<div className="mt-2 flex justify-center">
						<Button
							type="button"
							className="w-full max-w-xs gap-2 md:w-auto"
							onClick={() => {
								console.log(
									"[DEBUG] Show Results clicked, properties:",
									properties,
								); // *
								setIsDrawerOpen(true);
							}}
						>
							Show Results
						</Button>
					</div>
				)}
			</form>
			<AdvancedFiltersDialog
				open={showAdvanced}
				onClose={() => setShowAdvanced(false)}
				control={control}
				errors={errors}
			/>
			<MapSection
				markers={markers}
				center={center}
				mapKey={process.env.NEXT_PUBLIC_GMAPS_KEY}
				drawingMode={drawingMode}
				shapeDrawn={shapeDrawn}
				boundaryApplied={boundaryApplied}
				onDrawPolygon={handleDrawPolygon}
				onDrawRectangle={handleDrawRectangle}
				onDrawCircle={handleDrawCircle}
				onDrawPolyline={handleDrawPolyline}
				onCancelDrawing={handleCancelDrawing}
				onApplyDrawing={handleApplyDrawing}
				onRemoveBoundaries={handleRemoveBoundaries}
				onShapeComplete={handleShapeComplete}
			/>
			<PropertiesList properties={properties} />
			<WalkThroughModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				videoUrl="https://www.youtube.com/watch?v=hyosynoNbSU" // Example YouTube video URL
				title="Welcome To Your Lead Search"
				subtitle="Get help searching and sorting through your properties."
				// Add the following props to enable the tour
				steps={campaignSteps} // Tour steps (array of objects with content and selectors)
				isTourOpen={isTourOpen} // Boolean to track if the tour is currently open
				onStartTour={handleStartTour} // Function to start the tour (triggered by button)
				onCloseTour={handleCloseTour} // Function to close the tour
			/>
		</div>
	);
};

export default PropertySearch;
