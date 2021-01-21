import { useState, useContext, createContext, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'

import { useSignInMutation } from 'lib/graphql/signIn.graphql'
import { useSignUpMutation } from 'lib/graphql/signUp.graphql'
import { useCurrentUserQuery } from 'lib/graphql/currentUser.graphql'
import { useRouter } from 'next/router'


type AuthProps = {
	user: any
	error: string
	signIn: (email: any, password: any) => Promise<void>
	signUp: (email: any, password: any, phone: any) => Promise<void>
	signOut: () => void
}

const AuthContext = createContext<Partial<AuthProps>>({})


const AuthProvider = ({ children }) => {
	const auth = useProvideAuth()
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}


const useAuth = () => {
	return useContext(AuthContext)
}


function useProvideAuth() {
	const client = useApolloClient()
	const router = useRouter()
	
	const [error, setError] = useState('')
	
	const { data } = useCurrentUserQuery({
		fetchPolicy: 'network-only',
		errorPolicy: 'ignore'
	})
	
	const user = data && data.currentUser
	
	const [signInMutation] = useSignInMutation()
	const [signUpMutation] = useSignUpMutation()

	const signIn = async (email, password) => {
		try	{
			const { data } = await signInMutation({ variables: { email, password }})
			console.log('dataUser =>', data.signIn.token, data.signIn.user)
			if (data.signIn.token && data.signIn.user)	{
				sessionStorage.setItem('token', data.signIn.token)
				client.resetStore().then(() => router.push('/'))
			}	else {
				setError('Invalid Login')
			}
		} catch (err)	{
			setError(err.message)
		}
	}
	
	
	const signUp = async (email, phone, password) => {
		try {
			const { data } = await signUpMutation({ variables: { email, phone, password }})
			
			if (data.signUp.token && data.signUp.user)	{
				sessionStorage.setItem('token', data.signUp.token)
				console.log('token =>', data.signUp.token)
				client.resetStore().then(() => { router.push('/') })
			} else {
				setError('Invalid Signup')
			}
		}	catch (err)	{
			setError(err.message)
		}
	}
	
	
	const signOut = () => {
		sessionStorage.removeItem('token')
		client.resetStore().then(() => {
			router.push('/')
		})
	}
	
	return { user, error, signIn, signUp, signOut }
}


export { useAuth, AuthProvider }