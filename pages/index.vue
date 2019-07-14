<template>
  <v-content fluid>
    <v-container class="pa-0 ma-0">
      <v-card fluid>
        <v-card-title fluid>
          Welcome to TOPhub
        </v-card-title>
        <v-card-text fluid>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex
                v-for="category in getAllCategories"
                :key="category.id"
                class="xs4"
              >
                <v-card fluid>
                  <v-card-title fluid>
                    {{ category.name }}
                  </v-card-title>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import getAllCategories from '~/apollo/queries/allData'

export default {
  apollo: {
    getAllCategories: {
      prefetch: true,
      query: getAllCategories
    }
  },
  head: {
    title: 'Cars with Apollo'
  }
}
</script>
