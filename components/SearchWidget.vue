<template>
  <ReactiveBase
    :url="'' + elastic_search_url + ''"
    app="com.topdesk.tophubbackend.data.entities.category,com.topdesk.tophubbackend.data.entities.entry"
  >
    <DataSearch
      :data-field="['name', 'title', 'target']"
      :show-clear="false"
      :render-suggestion="renderSuggestion"
      @valueSelected="logit"
      component-id="SearchSensor"
      icon-position="right"
      class-name="data-search"
      placeholder="Try me"
    />
    <ReactiveList
      :pagination="true"
      :from="0"
      :react="{ and: ['SearchSensor'] }"
      :size="5"
      component-id="SearchResult"
      data-field="name"
      class-name="result-list-container"
    >
      <div slot="renderItem" slot-scope="{ item }">
        {{ item }}
      </div>
    </ReactiveList>
  </ReactiveBase>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      chosen: '',
      elastic_search_url: process.env.elastic_search_host
    }
  },
  methods: {
    logit(value) {
      console.log(value)
    },
    renderSuggestion(suggestion) {
      console.log(suggestion)
      const isCategory =
        suggestion.source._index ===
        'com.topdesk.tophubbackend.data.entities.category'
      return {
        label: isCategory
          ? `${suggestion.source.name} - Group`
          : `${suggestion.source.title} - ${suggestion.source.target} - Link`,
        value: isCategory ? suggestion.source.name : suggestion.source.title,
        source: suggestion.source // for onValueSelected to work with renderSuggestion
      }
    }
  }
}
</script>
