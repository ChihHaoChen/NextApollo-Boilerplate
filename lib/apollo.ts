import { useMemo } from 'react'
import {
	ApolloClient,
	InMemoryCache,
	NormalizedCacheObject,
	HttpLink
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined


const createApolloClient = () => {

	const authLink = setContext((_, { headers }) => {
		// To get the auth token from the local storage if it is given
		const token = sessionStorage.getItem('token')
		// return the headers to the context so httpLink can read them
		return {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	})


	const httpLink = new HttpLink({
		uri: 'http://localhost:8000/graphql',
		credentials: 'include'
	})


	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache()
	})
}


const initializeApollo = (initialState: any = null) => {
	
	const _apolloClient = apolloClient ?? createApolloClient()

	// Update the initial state if Next.js data fetching methods that use Apollo Client are given
	if (initialState)	{
		_apolloClient.cache.restore(initialState)
	}

	// For SSG & SSR, creates a new Apollo Client
	if (typeof window === 'undefined')	return _apolloClient
	// creates the Apollo Client if in the Client browser
	if (!apolloClient) apolloClient = _apolloClient

	return _apolloClient
}

const useApollo = (initialState: any)	=> {
	const store = useMemo(() => initializeApollo(initialState), [initialState])

	return store
}


export { initializeApollo, useApollo }