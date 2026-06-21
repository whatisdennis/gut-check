"use client";

import { useEffect, useReducer, useRef } from "react";
import { type ProductType } from "./content";
import { buildScreens, type Answers } from "./engine";

const STORAGE_KEY = "gutcheck:v1";

export type Phase = "welcome" | "interview" | "reality" | "export";

export type State = {
  phase: Phase;
  idea: string;
  ptype: ProductType;
  answers: Answers;
  step: number;
};

const initialState: State = {
  phase: "welcome",
  idea: "",
  ptype: "General",
  answers: {},
  step: 0,
};

type Action =
  | { type: "hydrate"; state: State }
  | { type: "setIdea"; idea: string }
  | { type: "setType"; ptype: ProductType }
  | { type: "start" }
  | { type: "answer"; key: string; value: string }
  | { type: "next" }
  | { type: "back" }
  | { type: "toExport" }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "setIdea":
      return { ...state, idea: action.idea };
    case "setType":
      return { ...state, ptype: action.ptype };
    case "start":
      return {
        ...state,
        phase: "interview",
        step: 0,
        answers: { ...state.answers, oneliner: state.answers.oneliner || state.idea },
      };
    case "answer":
      return { ...state, answers: { ...state.answers, [action.key]: action.value } };
    case "next": {
      const last = buildScreens(state.ptype).length - 1;
      if (state.step >= last) return { ...state, phase: "reality" };
      return { ...state, step: state.step + 1 };
    }
    case "back": {
      if (state.phase === "export") return { ...state, phase: "reality" };
      if (state.phase === "reality") {
        return { ...state, phase: "interview", step: buildScreens(state.ptype).length - 1 };
      }
      if (state.step <= 0) return { ...state, phase: "welcome" };
      return { ...state, step: state.step - 1 };
    }
    case "toExport":
      return { ...state, phase: "export" };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function useGutCheck() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Persistence is gated until after hydration so the initial mount render
  // (which still holds the default state) cannot clobber saved progress.
  const ready = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        if (parsed && typeof parsed === "object") dispatch({ type: "hydrate", state: parsed });
      }
    } catch {
      // ignore corrupt storage
    }
    const id = setTimeout(() => {
      ready.current = true;
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!ready.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable; the run still works in-memory
    }
  }, [state]);

  return { state, dispatch };
}
