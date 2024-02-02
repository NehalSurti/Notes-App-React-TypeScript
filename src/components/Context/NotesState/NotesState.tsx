import { Dispatch, createContext } from "react";
import { NoteType } from "../../Note/noteType";
import { Notes } from "../../Note/data";

interface NoteState {
  notes: NoteType[];
  editMode: boolean;
  noteToBeEditted: NoteType | null;
}

type NoteAction =
  | { type: "ADD_NOTE"; payload: NoteType }
  | { type: "EDIT_NOTE"; payload: string }
  | { type: "DELETE_NOTE"; payload: string }
  | { type: "UPDATE_NOTE"; payload: NoteType };

interface NotesStateContextProps {
  state: NoteState;
  dispatch: Dispatch<NoteAction>;
}

const initialState: NoteState = {
    notes: Notes,
    editMode: false,
    noteToBeEditted: null,
  };

export const NotesStateContext = createContext<NotesStateContextProps>({ state: initialState, dispatch: () => null });
