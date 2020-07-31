export default ({ app }) => {
  app.router.afterEach((to, from) => {
    if (to.path === '/aboutUs/comIntroduction.html') {
      app.store.state.activeIndex =0
      app.store.commit('changeIndex',0)
    }
    else if(to.path === '/aboutUs/corporateVision.html') {
      app.store.commit('changeIndex',1)
    }
    else if(to.path === '/aboutUs/devHistory.html') {
      app.store.commit('changeIndex',2)
    }
    else if(to.path === '/aboutUs/Partner.html') {
      app.store.commit('changeIndex',3)
    }
    else if(to.path === '/aboutUs/contactUs.html') {
      app.store.commit('changeIndex',4)
    }
  })
}