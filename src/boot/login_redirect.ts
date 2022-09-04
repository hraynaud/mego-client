import { boot } from 'quasar/wrappers';
import { authService } from 'src/core/services';

export default boot(({ router }) => {
  router.beforeEach(async (to) => {
    if (authService.isLoggedOut() && to.meta.requiresAuth === true) {
      return { name: 'login' };
    } else {
      return true;
    }
  });
});
