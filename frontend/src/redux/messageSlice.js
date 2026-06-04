// import { createSlice } from "@reduxjs/toolkit";

// const messageSlice = createSlice({
//   name: "message",

//   initialState: {
//     messages: [],
//   },

//   reducers: {
//     setMessages: (state, action) => {
//       state.messages = action.payload;
//     },
//   },
// });

// export const { setMessages } = messageSlice.actions;

// export default messageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",

  initialState: {
    messages: [],
  },

  reducers: {
    // Used for setting the entire message history (e.g., initial fetch from API)
    setMessages: (state, action) => {
      state.messages = action.payload;
    },

    // 🌟 ADDED: Safely appends a single real-time message to your chat history
    pushMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

// 🌟 Export both actions so they can be used across your application
export const { setMessages, pushMessage } = messageSlice.actions;

export default messageSlice.reducer;