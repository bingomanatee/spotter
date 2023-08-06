import { Forest } from '@wonderlandlabs/forest'
import { typedLeaf } from '@wonderlandlabs/forest/lib/types'

type User = { email: string }
type umStore = typedLeaf<{ user: User | null }>
export const SUPABASE_CLIENT_KEY = 'supabaseClient'
export const userManager = new Forest({
  $value: {
    user: null,
  },
  selectors: {
    currentUserId(store: umStore) {
      return store.value.user?.id ?? null
    }
  },
  actions: {
    init(store: umStore, supabase, router) : Promise<void> {
      if (router && !store.getMeta('router')) {
        store.setMeta('router', router, true);
      }
      if (store.getMeta(SUPABASE_CLIENT_KEY)) {
        return;
      }
      store.setMeta(SUPABASE_CLIENT_KEY, supabase, true);
      return supabase.auth.getSession()
        .then(({ data }) => {
          const { session } = data;
          store.do.set_user(session?.user);
          console.log('::: user = ', session?.user);
        })
        .catch((err) => {
          console.error('session error:', err);
        });
    },
    signOut(store: umStore) {
      const router = store.getMeta('router');
      const supabaseClient = store.getMeta(SUPABASE_CLIENT_KEY);
      if (supabaseClient) {
        store.do.set_user(null);
        if (!router && window) {
          window.document.location.href='/account/signout' //@TODO: absolute url
        } else {
          router?.push('/account/signout');
        }
      }
    }
  }
});
