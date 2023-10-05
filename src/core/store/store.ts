import { atom } from 'jotai';
import { Event } from '../types/event.type';

export const searchAtom = atom('');
export const selectedEventAtom = atom<{ event: Event | undefined }>({ event: null });

export const updateVisibleAtom = atom(false);
export const createVisibleAtom = atom(false);
