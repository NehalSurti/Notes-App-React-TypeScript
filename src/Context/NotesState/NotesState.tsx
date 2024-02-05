import { createContext } from "react";
import { NoteStateType, NotesStateContextProps } from "../../Types/Types";

export const initialState: NoteStateType = {
  notes: [],
  editMode: false,
  noteToBeEditted: null,
};

export const NotesStateContext = createContext<NotesStateContextProps>({
  state: initialState,
  dispatch: () => null,
});
