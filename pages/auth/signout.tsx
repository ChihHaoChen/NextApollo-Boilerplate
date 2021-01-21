import { useEffect } from 'react'
import { useAuth } from 'lib/useAuth'

const SignOut = () => {
  const { signOut } = useAuth()
  useEffect(() => {
    signOut();
  }, []);
  return <div>Signout</div>;
}


export { SignOut as default }