export interface InitialStateTypes {
  nav: boolean;
  activeTab: string;
}

const initialState: InitialStateTypes = {
  nav: false,
  activeTab: "home",
};

export default initialState;
