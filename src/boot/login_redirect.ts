import { boot } from 'quasar/wrappers';
import { authService } from 'src/core/services';

export default boot(({ router }) => {
  router.beforeEach(async (to) => {
    console.log('checking auth status');
    if (authService.isLoggedOut() && to.meta.requiresAuth === true) {
      console.log('logged out?');
      return { name: 'login' };
    } else {
      return true;
    }
  });
});
