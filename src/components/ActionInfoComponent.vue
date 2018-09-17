<template>
  <div class="action-info-component">
    <div v-if="loading" class="loading-block">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
    <input type="text" v-model="searchText" class="search">
    <div class="items">
      <div class="header">
        <div class="type">
        <select v-model="searchType">
          <option value="">ALL</option>
          <option v-for="type in listType" :key="type">{{type}}</option>
        </select>  
        </div>        
        <div class="label" v-on:click="orderBy = 'label'">Label</div>
        <tt class="margin" v-on:click="orderBy = 'margin'">margin</tt>
        <tt class="low" v-on:click="orderBy = 'low'">low</tt>
        <tt class="cost" v-on:click="orderBy = 'cost'">cost</tt>
        <tt class="nb" v-on:click="orderBy = 'nb'">quantity</tt>
        <tt class="mean" v-on:click="orderBy = 'mean'">mean</tt>
         <div class="info" v-on:click="orderBy = 'info'">info</div>
      </div>
      <div v-for="item in orderedAndFilteredUsers" :key="calcKey(item)" class="item" >
        <div class="type">{{ item.type }}</div>
        <div class="label"><span v-for="lvl in item.level" :key="lvl" class="level">*</span><a class="icontiny" :href="'https://www.wowhead.com/item=' + item.id" :data-wowhead="'item=' + item.id">{{ item.label }}</a></div>
        <tt class="margin">{{ item.margin }}</tt>
        <tt class="low">{{ item.low }}</tt>
        <tt class="cost">{{ item.cost }}</tt>        
        <tt class="nb">{{ item.nb }}</tt>
        <tt class="mean">{{ item.mean }}</tt>
        <div class="info">{{ item.info }} {{item.zone}} {{item.area}}</div>
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
      this.loading = true;
      this.makeRequest(window.location.protocol + "//" + window.location.host.replace('8080', '3000'), "GET").then(result => {
        this.items = result;
      }).finally( () => {
        this.loading = false;
      });
    }
  },
  mounted: function() {
    window.whTooltips = {colorLinks: true, iconizeLinks: true, renameLinks: true};
    this.loadData();
    setInterval(() => {
      this.loadData();
    }, 5000)
  }
};
</script>
<style>
.action-info-component {
  position: relative;
  background-color: rgb(2, 2, 2);
}

h1 {
  color: black;
}

.search {
  width:100%;
  height:45px;
  border:none;
  font-size: 43px;
  padding: 5px 15px;
}

textarea:focus, input:focus, select:focus{
    outline: none;
}

.item,
.header {
  display: flex;
  padding: 5px;
align-items: center;
    justify-content: space-between;
    flex-direction: row;  
      
      color:#FFF;
}

.level:not(:empty) {
  padding: 0 5px;
}

.item:nth-child(even) {
}
.header {
  background-color: rgb(255, 255, 255);
  color:rgb(0, 0, 0);
  border-top:2px solid #000;
}

.item div,
.header div {
  display: flex;
  justify-content: flex-start;
  text-align: right;

}
tt {
    display: flex;
    justify-content: flex-end;
      font-size: 15px;
}

.label,
.margin,
.low,
.cost,    
.nb,
.mean,
.info,
.type {
 flex: 1;

}

.item .margin {
  color:gold;
}

.item .low {
  color:#0070dd;
}

.item .cost {
  color:red;
}

.item .nb {
  color:magenta;
}

.type{
  flex: 1;
}
.label, .info  {
  flex: 3;
  padding: 0 10px;
}

.item:hover {
  /* background-color: rgb(95, 95, 95);
  color:#fff; */
}

.item a, .item:hover a{
  color:#fff;
}

.loading-block {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid grey;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
</style>