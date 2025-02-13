import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../util/supabse'

export default function AuthComponent() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={[]}
        view="sign_in"
      />
    </div>
  )
}