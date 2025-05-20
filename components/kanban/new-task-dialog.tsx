"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { mockTeamMembers } from "@/constants/_faker/profile/team/members";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { mockGeneratedLeads } from "@/constants/data";
import { mockLeadListData } from "@/constants/dashboard/leadList";
import { useTaskStore } from "@/lib/stores/taskActions";

export default function NewTaskDialog() {
	const addTask = useTaskStore((state) => state.addTask);
	const [assignType, setAssignType] = useState<"lead" | "leadList" | "">("");
	const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
	const [selectedLeadListId, setSelectedLeadListId] = useState<number | null>(
		null,
	);
	const [assignedUserId, setAssignedUserId] = useState<string>("");
	const [formValid, setFormValid] = useState(false);

	const validateForm = (form: HTMLFormElement) => {
		const title = form.title.value?.trim();
		const description = form.description.value?.trim();
		if (!title || !description) return false;
		if (!assignType) return false;
		if (assignType === "lead" && !selectedLeadId) return false;
		if (assignType === "leadList" && !selectedLeadListId) return false;
		if (!assignedUserId) return false;
		return true;
	};

	const handleInputChange = (e: React.FormEvent<HTMLFormElement>) => {
		setFormValid(validateForm(e.currentTarget));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const formData = new FormData(form);
		const { title, description } = Object.fromEntries(formData);
		if (typeof title !== "string" || typeof description !== "string") return;
		if (assignType === "lead" && selectedLeadId) {
			formData.append("leadId", String(selectedLeadId));
		}
		if (assignType === "leadList" && selectedLeadListId) {
			formData.append("leadListId", String(selectedLeadListId));
		}
		addTask(title, description);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="secondary" size="sm">
					＋ Add New Todo
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Todo</DialogTitle>
					<DialogDescription>
						What do you want to get done today?
					</DialogDescription>
				</DialogHeader>
				<form
					id="todo-form"
					className="grid gap-4 py-4"
					onSubmit={handleSubmit}
					onInput={handleInputChange}
					autoComplete="off"
				>
					{/* Assignment Type Dropdown */}
					<div className="grid grid-cols-4 items-center gap-4">
						<label htmlFor="assign-type" className="col-span-1 font-semibold">
							Assign:
						</label>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="col-span-3">
									{assignType === "lead"
										? "Assign Lead"
										: assignType === "leadList"
											? "Assign Lead List"
											: "Select Type"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onSelect={() => setAssignType("lead")}>
									Lead
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={() => setAssignType("leadList")}>
									Lead List
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Lead Dropdown */}
					{assignType === "lead" && (
						<div className="mt-2 grid grid-cols-4 items-center gap-4">
							<label className="col-span-1 font-semibold" htmlFor="lead-select">
								Lead
							</label>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="col-span-3"
										id="lead-select"
										aria-haspopup="listbox"
									>
										{selectedLeadId
											? (() => {
													const lead = mockGeneratedLeads.find(
														(l) => l.id === selectedLeadId,
													);
													return lead
														? `${lead.firstName} ${lead.lastName}`
														: "Select Lead";
												})()
											: "Select Lead"}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									{mockGeneratedLeads.map((lead) => (
										<DropdownMenuItem
											key={lead.id}
											onSelect={() => setSelectedLeadId(lead.id)}
										>
											{lead.firstName} {lead.lastName}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}

					{/* Lead List Dropdown */}
					{assignType === "leadList" && (
						<div className="mt-2 grid grid-cols-4 items-center gap-4">
							<label
								className="col-span-1 font-semibold"
								htmlFor="lead-list-select"
							>
								Lead List
							</label>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										variant="outline"
										className="col-span-3"
										id="lead-list-select"
										aria-haspopup="listbox"
									>
										{selectedLeadListId
											? (() => {
													const list = mockLeadListData.find(
														(l) => l.id === selectedLeadListId,
													);
													return list ? list.listName : "Select Lead List";
												})()
											: "Select Lead List"}
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									{mockLeadListData.map((list) => (
										<DropdownMenuItem
											key={list.id}
											onSelect={() => setSelectedLeadListId(list.id)}
										>
											{list.listName}
										</DropdownMenuItem>
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					)}

					{/* Team Member Assignment Dropdown */}
					<div className="grid grid-cols-4 items-center gap-4">
						<label
							htmlFor="team-member-select"
							className="col-span-1 font-semibold"
						>
							Assign To:
						</label>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									variant="outline"
									className="col-span-3"
									id="team-member-select"
									aria-haspopup="listbox"
								>
									{assignedUserId
										? (() => {
												const member = mockTeamMembers?.find(
													(m) => m.id === assignedUserId,
												);
												return member
													? `${member.firstName} ${member.lastName}`
													: "Select Team Member";
											})()
										: "Select Team Member"}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{(mockTeamMembers || []).map((member) => (
									<DropdownMenuItem
										key={member.id}
										onSelect={() => setAssignedUserId(member.id)}
									>
										{member.firstName} {member.lastName}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Todo Title Field */}
					<div className="mb-2">
						<label
							htmlFor="title"
							className="mb-1 block font-medium text-gray-700 text-sm"
						>
							Todo Title
						</label>
						<Input
							id="title"
							name="title"
							placeholder="Enter a concise task title"
							aria-label="Todo Title"
							className="w-full rounded-md border border-gray-300 px-3 py-2 transition focus:border-primary focus:ring-2 focus:ring-primary/30"
							required
						/>
					</div>

					{/* Description Field */}
					<div className="mb-2">
						<label
							htmlFor="description"
							className="mb-1 block font-medium text-gray-700 text-sm"
						>
							Description
						</label>
						<Textarea
							id="description"
							name="description"
							placeholder="Add details, context, or acceptance criteria..."
							aria-label="Todo Description"
							className="min-h-[80px] w-full rounded-md border border-gray-300 px-3 py-2 transition focus:border-primary focus:ring-2 focus:ring-primary/30"
							required
						/>
					</div>
				</form>
				<DialogFooter>
					<DialogTrigger asChild>
						<Button
							type="submit"
							size="sm"
							form="todo-form"
							disabled={!formValid}
						>
							Add Todo
						</Button>
					</DialogTrigger>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
