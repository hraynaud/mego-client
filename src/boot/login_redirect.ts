import { boot } from 'quasar/wrappers';
import { authService } from 'src/core/services';

export default boot(({ router }) => {
  // function withoutAuth(dest: RouteRecordName) {
  //   return !!unAuthentcatedRoutes.find(dest);
  // }

  router.beforeEach(async (to) => {
    if (!authService.currentUser() && !to.meta.requiresAuth === false) {
      return { name: 'login' };
    } else {
      return true;
    }
  });
});
