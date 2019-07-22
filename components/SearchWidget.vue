<template>
  <ReactiveBase
    app="com.topdesk.tophubbackend.data.entities.category,com.topdesk.tophubbackend.data.entities.entry"
    url="http://127.0.0.1:9200"
  >
    <DataSearch
      componentId="SearchSensor"
      iconPosition="right"
      :dataField="['name', 'title', 'target']"
      className="data-search"
      :showClear="false"
      placeholder="Try me"
      @valueSelected="logit"
      :renderSuggestion="renderSuggestion"
    />
    <ReactiveList
      componentId="SearchResult"
      dataField="name"
      className="result-list-container"
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
      chosen: ''
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
