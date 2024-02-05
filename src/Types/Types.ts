import { Dispatch } from "react";

export type Priority = 'high' | 'medium' | 'low';

export type NoteType = {
    id: string,
    text: string,
    priority: Priority,
    createdAt: Date,
    updatedAt: Date
}

export enum ColorLight {
    high = '#FFAEAE',
    medium = '#FFEC94',
    low = '#B0E57C'
}

export enum ColorDark {
    high = '#D70000',
    medium = '#CC9933',
    low = '#77A600'
}

export interface NoteStateType {
    notes: NoteType[];
    editMode: boolean;
    noteToBeEditted: NoteType | null;
}

export type NoteActionType =
    | { type: "INIT_NOTES"; payload: NoteType[] }
    | { type: "ADD_NOTE"; payload: NoteType }
    | { type: "EDIT_NOTE"; payload: string }
    | { type: "DELETE_NOTE"; payload: string }
    | { type: "UPDATE_NOTE"; payload: NoteType };

export interface NotesStateContextProps {
    state: NoteStateType;
    dispatch: Dispatch<NoteActionType>;
}

export type NoteProps = {
    id: string;
    text: string;
    priority?: Priority;
    createdAt: Date;
    updatedAt: Date;
    note: NoteType;
    isDetailed?: boolean;
    height?: string;
  };