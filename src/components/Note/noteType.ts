export type Priority = 'high' | 'medium' | 'low';

export type NoteType = {
    id: string;
    text : string;
    priority : Priority;
}

export enum ColorLight {
    high ='rgb(246, 100, 92)',
    medium = 'rgb(248, 153, 118',
    low='rgb(248, 249, 175)',
}

export enum ColorDark {
    high ='rgb(143, 66, 61)',
    medium = 'rgb(190, 131, 79',
    low='rgb(151, 152, 98)',
}