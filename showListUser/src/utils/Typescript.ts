import store from "../redux/stores";

export type RootState = ReturnType<typeof store.getState>;
