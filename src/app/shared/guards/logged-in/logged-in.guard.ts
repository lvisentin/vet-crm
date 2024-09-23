import { CanActivateChildFn, Router } from '@angular/router';
import { SupabaseService } from '../../services/supabase/supabase.service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateChildFn = () => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);
  const isLoggedIn = supabaseService.isLoggedIn();

  if (!isLoggedIn) {
    return router.navigate(['auth/signIn']);
  }

  return isLoggedIn;
};
