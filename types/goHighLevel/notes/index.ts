// Create Note request structure
export type CreateNoteRequest = {
	id: string;
	body: string;
};

// Response type for creating a note
export type CreateNoteResponse = {
	note: {
		id: string;
		body: string;
		id: string;
		dateAdded: string;
		contactId: string;
	};
};

// Note structure
export type Note = {
	id: string;
	body: string;
	id: string;
	dateAdded: string;
	contactId: string;
};

// Response type for a single note
export type NoteResponse = {
	note: Note;
};

// Create/Update Note request structure
export type NoteRequest = {
	id: string;
	body: string;
};

// Response type for deleting a note
export type DeleteNoteResponse = {
	succeeded: boolean;
};
