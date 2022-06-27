import { boot } from 'quasar/wrappers';
import { RouteLocationNormalized, RouteRecordName } from 'vue-router';

export default boot(({ router }) => {
  const isAuthenticated = false;

  // function withoutAuth(dest: RouteRecordName) {
  //   return !!unAuthentcatedRoutes.find(dest);
  // }

  router.beforeEach(async (to) => {
    if (!isAuthenticated && !to.meta.requiresAuth === false) {
      return { name: 'login' };
    } else {
      return true;
    }
  });
});
