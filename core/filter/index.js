import inforDomain from './inforDomain.filter';
import detailDate from './detailDate.filter'
const install = function (Vue) {
  /* istanbul ignore if */
  if (install.installed) return;

  Vue.filter('inforDomain', inforDomain);
  Vue.filter('detailDate', detailDate);
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install

};
