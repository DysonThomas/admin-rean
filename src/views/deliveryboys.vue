 <template>
 <div class="container mt-5">
            <b-tabs id="tab" content-class="mt-3" align="center">
              <b-tab title=" Delivery Boys" active>
               
            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Place</th>
                      <th>ID</th>
                      <th>Modify</th>
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="deliveryBoy in deliveryBoys">
                        <td>
                          {{deliveryBoy.name}}
                        </td>

                        <td>
                          {{deliveryBoy.country}}
                        </td>
                        <td>
                          {{deliveryBoy.phone}}
                        </td>

                        <td>

                          <button class="btn mr-2 btn-primary" @click="editProduct(deliveryBoy)">Edit</button>
                          <button class="btn btn-danger" @click="deleteProduct(deliveryBoy)">Delete</button>
                        </td>

                      </tr>


                  </tbody>
                </table>



            </div>

                  <b-modal id="modal-3" title="Edit Delivery Boys Details" :hide-footer="true">
        <div>
                <div class="row">
                  <!-- main product -->
                  <div class="col">
                    <div class="form-group">
                      <input type="text" placeholder="Enter Deliveryboy Name" v-model="delivery.name" class="form-control">
                    </div>
                     <div class="form-group">
                      <textarea placeholder="Phone Number" v-model="delivery.phone" class="form-control"></textarea>
                    </div>
                              <div class="form-group">
                    <input type="text" v-model="delivery.hname" class="form-control" placeholder="House Name" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.pincode" class="form-control" placeholder="Pincode" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.place" class="form-control" placeholder="Place" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.state" class="form-control" placeholder="State" required>  
                         </div>
                          <div class="form-group">
                    <input type="text" v-model="delivery.country" class="form-control" placeholder="Country" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.ahno" class="form-control" placeholder="Adhar Card Number" required>  
                         </div>
                          <div class="form-group">
                    <input type="text" v-model="delivery.pnno" class="form-control" placeholder="Pan Card Number" required>  
                         </div>

                  </div>
                   </div> 
            <div class="modal-footer">
             
              <button @click="updateProduct()" type="button" class="btn btn-primary">Apply changes</button>
            </div>
          </div>
        </b-modal>

              
                
              </b-tab>
              <b-tab title="Add Delivery Boys">
                  <form>
                         <div class="form-group">
                    <input type="text" v-model="delivery.name" class="form-control" placeholder="Enter Deliery Boy Name" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.phone" class="form-control" placeholder="Phone Number" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.hname" class="form-control" placeholder="House Name" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.pincode" class="form-control" placeholder="Pincode" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.place" class="form-control" placeholder="Place" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.state" class="form-control" placeholder="State" required>  
                         </div>
                          <div class="form-group">
                    <input type="text" v-model="delivery.country" class="form-control" placeholder="Country" required>  
                         </div>
                         <div class="form-group">
                    <input type="text" v-model="delivery.ahno" class="form-control" placeholder="Adhar Card Number" required>  
                         </div>
                          <div class="form-group">
                    <input type="text" v-model="delivery.pnno" class="form-control" placeholder="Pan Card Number" required>  
                         </div>
                    <div class="form-group"> 
                      
                      <input type="email" v-model="delivery.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email" required>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="delivery.password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                    </div>
                     <div class="form-group">
                       <input type="file" @change="uploadImage" class="form-control">
                    </div>
                    
                     <div class="form-group d-flex">
                      <div v-for="(image, index) in delivery.image">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>
                    
                    <button type="submit" @click="register" class="btn btn-primary mr-2">Add</button>
                    <!-- <button type="submit" @click="close"  class="btn btn-primary">Close</button> -->
                  </form>
             
              </b-tab>
            </b-tabs>
          </div>
</template>
<script>
import {fb,db} from '../firebase'

import firebase from '../firebase'
  export default {
    name: "Deliveryboy",
    props: {
      msg: String
    },
      data(){
      return {
          deliveryBoys:[],
         delivery:{
             email:"",
             password:"",
             pnno:"",
             ahno:"",
             country:"",
             state:"",
             place:"",
             pincode:"",
             hname:"",
             name:"",
             image:[]


         }
      }
  },
  firestore(){
      return {
        deliveryBoys: db.collection('deliveryBoys'),
      }
  },
   created(){
     fb.auth().onAuthStateChanged((user)=>{
     if (user) {
      //  console.log(user)
      this.status=1
     } else {
    
  }
});


  },
    methods:{
          uploadImage(e){

      if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('DB/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            alert("Error")
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.delivery.image.push(downloadURL);
            });

          });

      }




    },
     reset(){
      this.delivery = {
           email:"",
             password:"",
             pnno:"",
             ahno:"",
             country:"",
             state:"",
             place:"",
             pincode:"",
             hname:"",
             name:"",
             image:[]
      }
    },
     updateProduct(){
        this.$firestore.deliveryBoys.doc(this.delivery.id).update(this.delivery);
          Toast.fire({
            type: 'success',
            title: 'Updated  successfully'
          })
          this.reset();
          this.$bvModal.hide('modal-3')
    },
     deleteProduct(doc){
      console.log(doc['.key']);
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          
          this.$firestore.deliveryBoys.doc(doc.id).delete()

          Toast.fire({
            type: 'success',
            title: 'Deleted  successfully'
          })

        
        }
      })


        
    },
    editProduct(deliveryboy){
        this.modal = 'edit';
        this.delivery = deliveryboy;
        this.$bvModal.show('modal-3')
 
    },
        
      register(){
          
            fb.auth().createUserWithEmailAndPassword(this.delivery.email, this.delivery.password)
                .then((user) => {
                  alert("Sucess")  
                    db.collection("deliveryBoys").doc(user.user.uid).set(
                        this.delivery
                       )
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });

                    // this.$router.replace('admin');
                })
                .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
      }
    }
  };
</script>
<style>
#tab{
    margin-left: 30%;
    width: 50%;
}

</style>