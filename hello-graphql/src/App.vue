<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { watch, ref } from 'vue';

const GET_STATES_QUERY = gql`
  query($prefix: String) {
    states(prefix: $prefix) {
      name
    }
  }
`

const search_query = ref("");
const query_condition = ref({ prefix: search_query.value })

watch(search_query, (new_query) => {
  query_condition.value.prefix = new_query
})

const { result, loading, error } = useQuery(GET_STATES_QUERY, query_condition)
</script>

<template>
  <input
      type="text"
      v-model="search_query"
    />
  <ul v-if="result">
      <li v-for="(state, index) in result.states" :key="index">{{ state.name }}</li>
    </ul>
</template>

<style scoped>
</style>