import { createApp, h, provide, render } from 'vue'
import App from './App.vue'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const httpLink = createHttpLink({
    uri: 'http://localhost:8080/graphql',
  })

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: cache,
})

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App)
})

app.mount('#app')
