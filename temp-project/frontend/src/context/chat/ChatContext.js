import React, { createContext, useReducer } from "react";
import { types } from "../../types/types";
// import { chatReducer } from "./chatReducer";
import useSound from "use-sound";
import newMsgSound from "../../media/new-message.mp3";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [playActive] = useSound(newMsgSound, { volume: 0.25 });

  const chatReducer = (state, action) => {
    switch (action.type) {
      case types.usuariosCargados:
        return {
          ...state,
          usuarios: [...action.payload],
        };

      case types.activarChat:
        if (state.chatActivo === action.payload) return state;

        return {
          ...state,
          chatActivo: action.payload,
          mensajes: [],
        };

      case types.nuevoMensaje:
        if (
          state.chatActivo === action.payload.de ||
          state.chatActivo === action.payload.para
        ) {
          if (action.payload.de === state.chatActivo) {
            playActive();
          }

          return {
            ...state,
            mensajes: [...state.mensajes, action.payload],
          };
        } else {
          return state;
        }

      case types.cargarMensajes:
        return {
          ...state,
          mensajes: [...action.payload],
        };

      default:
        return state;
    }
  };

  const initialState = {
    uid: "",
    chatActivo: null, // UID del usuario al que yo quiero enviar mensajes
    usuarios: [], // Todos los usuarios de la base datos
    mensajes: [], // El chat seleccionado
  };

  const [chatState, dispatch] = useReducer(chatReducer, initialState);
  console.log(chatState);
  return (
    <ChatContext.Provider
      value={{
        chatState,
        dispatch,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
