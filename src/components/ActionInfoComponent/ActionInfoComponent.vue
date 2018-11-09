<template>
  <div class="action-info-component">
    <div v-if="loading" class="loading-block">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
    <div class="listSearch">
      <input type="text" v-model="searchLocal" class="search" value="fr_FR">
      <input type="text" v-model="searchServer" class="search" value="dalaran">
      <button v-on:click='loadData()' class="searchbutton">Search</button>
    </div>
    <input type="text" v-model="searchText" class="search">
    <div class="items">
      <div class="header">
        <div class="type no-sm">
        <select v-model="searchType">
          <option value="">ALL</option>
          <option v-for="type in listType" :key="type">{{type}}</option>
        </select>  
        </div>        
        <div class="label " v-on:click="orderBy = 'label'">Label</div>
        <tt class="margin" v-on:click="orderBy = 'margin'">margin</tt>
        <tt class="low " v-on:click="orderBy = 'low'">low</tt>
        <tt class="cost no-sm" v-on:click="orderBy = 'cost'">cost</tt>
        <tt class="nb no-sm" v-on:click="orderBy = 'nb'">quantity</tt>
        <tt class="mean no-sm" v-on:click="orderBy = 'mean'">mean</tt>
        <div class="info no-sm" v-on:click="orderBy = 'info'">info</div>
      </div>
      <div v-for="item in orderedAndFilteredUsers" :key="calcKey(item)" class="item" >
        <div class="type no-sm">{{ item.type }}</div>
        <div class="label"><span v-for="lvl in item.level" :key="lvl" class="level">*</span><a class="icontiny" :href="'https://www.wowhead.com/item=' + item.id" :data-wowhead="'item=' + item.id">{{ item.label }}</a></div>
        <tt class="margin">{{ item.margin }}</tt>
        <tt class="low">{{ item.low }}</tt>
        <tt class="cost no-sm">{{ (item.cost > 0 ? item.cost : '') }}</tt>        
        <tt class="nb no-sm">{{ item.nb }}</tt>
        <tt class="mean no-sm">{{ item.mean }}</tt>
        <div class="info no-sm">{{ item.info }} {{item.zone}} {{item.area}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  props: ["ids"],
  data: () => {
    return {
      orderBy: "buyout",
      searchText: '',
      searchType: '',
      loading: false,
      searchLocal : 'fr_FR',
      searchServer : 'dalaran',
      items: []
    };
  },
  computed: {
    filteredItems: function() {
      return this.items.filter(item => {
        return (!this.searchType || item.type === this.searchType) && item.label.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
      });
    },
    orderedAndFilteredUsers: function() {
      return _.orderBy(this.filteredItems, [this.orderBy], ["desc"]);
    },
    listType: function() {
      return _.uniq(_.map(this.items, 'type'));
    },
  },
  methods: {
    calcKey : function(item) {
      return item.id + (item.level? '-'+ item.level : '');
    },
    makeRequest: function(url, method) {
      return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function() {
          if (this.status >= 200 && this.status < 300) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject({
              status: this.status,
              statusText: xhr.statusText
            });
          }
        };
        xhr.onerror = function() {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        };
        xhr.send();
      });
    },
    loadData: function()  {
      if(this.searchLocal && this.searchServer) {
        this.loading = true;
        this.makeRequest(window.location.protocol + "//" + window.location.host.replace('8080', '3000')+"/"+this.searchLocal+ "/"+this.searchServer, "GET")
        .then(result => {
          this.items = result;
        }).finally( () => {
          this.loading = false;
        });
      }
    }
  },
  mounted: function() {
    window.whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};
  }
};
</script>
<style scoped lang="scss">
@import url("./ActionInfoComponent.scss");
</style>