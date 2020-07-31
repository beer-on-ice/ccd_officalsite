export const strict = false;
export const state = () => ({
  activeIndex: 2
});

export const mutations = {
  changeIndex(state, index) {
    state.activeIndex = index;
  }
};
