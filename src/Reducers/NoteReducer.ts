import { NoteStateType, NoteActionType } from "../Types/Types";

export const noteReducer = (
    state: NoteStateType,
    action: NoteActionType
): NoteStateType => {
    switch (action.type) {
        case "INIT_NOTES":
            return { ...state, notes: action.payload };
        case "ADD_NOTE":
            return { ...state, notes: [action.payload, ...state.notes] };
        case "EDIT_NOTE":
            const note = state.notes.find((note) => note.id === action.payload);
            if (note) {
                return { ...state, editMode: true, noteToBeEditted: note };
            } else {
                return state;
            }
        case "DELETE_NOTE":
            const index = state.notes.findIndex((note) => note.id === action.payload);
            let editNotes = [...state.notes];
            editNotes.splice(index, 1);
            return { ...state, notes: editNotes };
        case "UPDATE_NOTE":
            const idx = state.notes.findIndex(
                (note) => note.id === action.payload.id
            );
            let updatedNotes = [...state.notes];
            updatedNotes.splice(idx, 1);
            updatedNotes.unshift(action.payload);
            return { ...state, notes: updatedNotes, editMode: false };
        default:
            return state;
    }
};