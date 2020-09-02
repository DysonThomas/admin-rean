<template>
  <div class="about">
    <b-modal id="showdetailsmodal" title="Details">
      <div class="card">
         
        
        <div class="card-body">
          <h5 class="card-title">{{selectedItem.cname}}</h5>
         Address: <p class="card-text"> {{selectedItem.hname}}<br>{{selectedItem.city}} PO. {{selectedItem.district}} <br>{{selectedItem.state}},{{selectedItem.postcode}}<br>{{selectedItem.phone}} </p>
          Status: <p>{{selectedItem.status}}</p>
         <p> {{this.selectedItem.timestamp}} </p>
        
          <b-form-select @change="updateStatus" v-model="selectedItem.status" :options="options"></b-form-select>
           <b-form-select class="mt-3" v-if="selectedItem.status=='Order Shipped'"  v-model="selectedItem.status"></b-form-select>
        </div>
      </div>
    </b-modal>
    <div class="border-bottom mt-3" v-for="(order,index) in orders" :key="index">
      <div @click="showDetails(order)" class="row row-items" v-for="(item, index) in order.order_items" :key="index">

        <div class="col-lg-2">
          <img class="item-img" :src=item.images[0]>
        </div>
        <div class="col-lg-4">

          <p>{{item.name}}</p>
        </div>
        <div class="col-lg-2">
          <p>size: {{item.size}}</p>

        </div>
        <div class="col-lg-2">
          <p>qty: {{item.quantity}}</p>
        </div>
        <div class="col-lg-2">
          <p>Status: {{order.status}}</p>
        </div>
       






      </div>
    </div>

  </div>
</template>

<script>
  import {
    fb,
    db
  } from '../firebase';
  export default {

    created() {
      const user = fb.auth().currentUser;
      db.collection("orders")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.docId=doc.id
            this.orders.push(doc.data(),this.docId)
            this.docId
            
            // console.log(doc.id, " => ", doc.data());
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    },
    data() {
      return {
          options: [
          { value: null, text: 'Please select an option' },
          { value: 'Order Placed', text: 'Order Placed' },
          { value: 'Order Packed', text: 'Order Packed' },
          { value: 'Order Shipped', text: 'Assign a Delivery Boy' }],
        orders: [],
        selectedItem: {},
        docId:{}
      }
    },
    methods: {
      showDetails(order,key) {
        
        this.selectedItem = order
        this.$bvModal.show('showdetailsmodal')
        this.selectedItem.timestamp=(this.selectedItem.created_at.toDate())

      },
      updateStatus(){
           db.collection("orders").doc(this.selectedItem.docId).update({
              status: this.selectedItem.status
          })
          .then(function() {
              console.log("Document successfully updated!");
          })
          .catch(function(error) {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
});
  
      }
    }

  }
</script>
<style>
  .item-img {
    width: 200px;
  }


  .border-bottom {

    border-bottom: 1px solid red;
  }

  .row-items {
    cursor: pointer;
  }
</style>