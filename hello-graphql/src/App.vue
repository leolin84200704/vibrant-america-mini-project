<script setup>
import {useQuery} from '@vue/apollo-composable'
import gql from 'graphql-tag';
import { watchEffect,computed } from 'vue';

const ALL_STATES_QUERY = gql`
  query {
    states { name }
  }
`;

const { result, loading, error } = useQuery(ALL_STATES_QUERY, {url: 'http://localhost:8080/graphql'});
const states = computed(() => result.value?.states ?? [])

watchEffect(() => {
  console.log(states);
})
</script>

<template>

</template>

<style scoped>

</style>
