<template>
  <ReactiveBase
    app="com.topdesk.tophubbackend.data.entities.category,com.topdesk.tophubbackend.data.entities.entry"
    url="{{ elastic_search_url }}"
  >
    <DataSearch
      component-id="SearchSensor"
      icon-position="right"
      :data-field="['name', 'title', 'target']"
      class-name="data-search"
      :show-clear="false"
      placeholder="Try me"
      :render-suggestion="renderSuggestion"
      @valueSelected="logit"
    />
    <ReactiveList
      component-id="SearchResult"
      data-field="name"
      class-name="result-list-container"
      :pagination="true"
      :from="0"
      :size="5"
      :react="{ and: ['SearchSensor'] }"
    >
      <div slot="renderData" slot-scope="{ item }">
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
