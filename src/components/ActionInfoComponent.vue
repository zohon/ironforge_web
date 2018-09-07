<template>
  <div class="action-info-component">
    <h1>My Vue Web Component</h1>
    <div v-if="loading" class="loading-block">
      <div class="lds-ripple"><div></div><div></div></div>
    </div>
    <input type="text" v-model="search">
    <div class="items">
      <div class="header">
        <div class="type" v-on:click="orderBy = 'type'">type</div>        
        <div class="label" v-on:click="orderBy = 'label'">Label</div>
        <div class="margin" v-on:click="orderBy = 'margin'">margin</div>
        <div class="low" v-on:click="orderBy = 'low'">low</div>
        <div class="cost" v-on:click="orderBy = 'cost'">cost</div>
        <div class="nb" v-on:click="orderBy = 'nb'">quantity</div>
        <div class="mean" v-on:click="orderBy = 'mean'">mean</div>
         <div class="info" v-on:click="orderBy = 'info'">info</div>
      </div>
      <div v-for="item in orderedAndFilteredUsers" :key="item.id" v-on:click="toto()" class="item" :title="item.id">
        <div class="type">{{ showType(item.type) }}</div>
        <div class="label">{{ item.label }}</div>
        <div class="margin">{{ item.margin }}</div>
        <div class="low">{{ item.low }}</div>
        <div class="cost">{{ item.cost }}</div>        
        <div class="nb">{{ item.nb }}</div>
        <div class="mean">{{ item.mean }}</div>
        <div class="info">{{ item.info }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import _orderBy from "lodash/orderBy";
export default {
  props: ["ids"],
  data: () => {
    return {
      orderBy: "buyout",
      search: "",
      loading: false,
      items: []
    };
  },
  computed: {
    filteredItems() {
      return this.items.filter(item => {
        return item.label.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    orderedAndFilteredUsers: function() {
      return _orderBy(this.filteredItems, [this.orderBy], ["desc"]);
    }
  },
  methods: {
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
    showType: target => {
      return target.slice(5).slice(0, -5);
    }
  },
  mounted: function() {
    this.loading = true;
    this.makeRequest("http://localhost:3000/", "GET").then(result => {
      this.items = result;
      
    }).finally( () => {
      this.loading = false;
    });
  }
};
</script>
<style>
.action-info-component {
  position: relative;
}

h1 {
  color: black;
}

.item,
.header {
  display: flex;
  padding: 5px;
align-items: center;
    justify-content: space-between;
    flex-direction: row;  
}

.item div,
.header div {
  display: flex;
  justify-content: flex-start;
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

.type, .info {
  flex: 2;
}
.label {
  flex: 3;
}

.item:nth-child(even) {
  background-color: rgb(241, 241, 241);
}
.item:hover {
  background-color: rgb(95, 95, 95);
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