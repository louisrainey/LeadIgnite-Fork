import { useState } from "react";
import LeadBasicInfoStep from "./steps/LeadBasicInfoStep";
import LeadAddressStep from "./steps/LeadAddressStep";
import LeadContactStep from "./steps/LeadContactStep";
import LeadSocialsStep from "./steps/LeadSocialsStep";

// * Main Lead Modal Component: Combines all modular steps
const LeadMain = () => {
	// Centralized state for all fields
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [stateValue, setStateValue] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");
	const [facebook, setFacebook] = useState("");
	const [linkedin, setLinkedin] = useState("");
	const [instagram, setInstagram] = useState("");
	const [twitter, setTwitter] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [step, setStep] = useState(0);

	// todo: Add validation logic and submission handler

	// * Sorted classnames for Biome compliance
	const buttonClass =
		"rounded-md bg-primary px-4 py-2 font-medium text-white hover:bg-primary/90";
	const navClass = "mt-6 flex items-center justify-between";

	return (
		<div className="mx-auto w-full max-w-lg p-6">
			{step === 0 && (
				<LeadBasicInfoStep
					firstName={firstName}
					lastName={lastName}
					onFirstNameChange={setFirstName}
					onLastNameChange={setLastName}
					errors={errors}
				/>
			)}
			{step === 1 && (
				<LeadAddressStep
					address={address}
					city={city}
					state={stateValue}
					zipCode={zipCode}
					onAddressChange={setAddress}
					onCityChange={setCity}
					onStateChange={setStateValue}
					onZipCodeChange={setZipCode}
					errors={errors}
				/>
			)}
			{step === 2 && (
				<LeadContactStep
					phoneNumber={phoneNumber}
					email={email}
					onPhoneNumberChange={setPhoneNumber}
					onEmailChange={setEmail}
					errors={errors}
				/>
			)}
			{step === 3 && (
				<LeadSocialsStep
					facebook={facebook}
					linkedin={linkedin}
					instagram={instagram}
					twitter={twitter}
					onFacebookChange={setFacebook}
					onLinkedinChange={setLinkedin}
					onInstagramChange={setInstagram}
					onTwitterChange={setTwitter}
					errors={errors}
				/>
			)}
			<div className={navClass}>
				<button
					type="button"
					className={buttonClass}
					disabled={step === 0}
					onClick={() => setStep((s) => Math.max(0, s - 1))}
				>
					Back
				</button>
				<button
					type="button"
					className={buttonClass}
					onClick={() => setStep((s) => Math.min(3, s + 1))}
					disabled={step === 3}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default LeadMain;
