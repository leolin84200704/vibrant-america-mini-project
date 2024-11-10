<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { watchEffect, computed, ref } from 'vue';

const ALL_STATES_QUERY = gql`
  query {
    states { name }
  }
`;

const { result, loading, error } = useQuery(ALL_STATES_QUERY, { url: 'http://localhost:8080/graphql' });
const states = computed(() => result.value?.states ?? []);

const search_query = ref("");
const filtered_states = computed(() => {
  const query = search_query.value.toLowerCase();
  return query
    ? states.value.filter(state => state.name.toLowerCase().startsWith(query))
    : [];
});

watchEffect(() => {
  console.log(filtered_states.value);
});
</script>

<template>
  <input
    type="text"
    v-model="search_query"
  />
  <ul v-if="filtered_states.length">
    <li
      v-for="(state, index) in filtered_states"
      :key="index"
      @click="() => search_query = state.name"
      class="suggestion-item"
    >
      {{ state.name }}
    </li>
  </ul>
</template>

<style scoped>
</style>