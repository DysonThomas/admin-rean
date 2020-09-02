<template>
  <div class="products">
      <div class="container">
          
        <!-- <div class="intro h-100">
            <div class="row h-100 justify-content-center align-items-center">
              <div class="col-md-6">
                    <h3>Products Page</h3>
                    
                 <p>
                   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde, ducimus.
                 </p>
              </div>
              <div class="col-md-6">
                  <img src="/img/svg/products.svg" alt="" class="img-fluid">
              </div>
            </div>
          </div> -->
<!-- 
          <hr> -->

          <div class="product-test">


            <h3 class="d-inline-block">Products list</h3>
            <button @click="addNew" class="btn btn-primary float-right">Add Product</button>

            <div class="table-responsive">
              
                <table class="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Modify</th>
                    </tr>
                  </thead>

                  <tbody>
                      <tr v-for="product in products">
                        <td>
                          {{product.name}}
                        </td>

                        <td>
                          {{product.price}}
                        </td>

                        <td>

                          <button class="btn mr-2 btn-primary" @click="editProduct(product)">Edit</button>
                          <button class="btn btn-danger" @click="deleteProduct(product)">Delete</button>
                        </td>

                      </tr>


                  </tbody>
                </table>
            </div>

          </div>
      </div>

      <!-- Modal -->
      <b-modal id="modal-1" title="Manage Product" :hide-footer="true">
        <div>
                <div class="row">
                  <!-- main product -->
                  <div class="col">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>
                     <div class="form-group">
                      <textarea placeholder="Product Description" v-model="product.description" class="form-control"></textarea>
                    </div>
                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>
                    <h6 class="formlabel">Main Division:*</h6>
                      <div class="form-group">
                      <b-form-select placeholder="Gender" v-model="product.selected" :options="options"></b-form-select>
                      </div>
                      <h6 class="formlabel">Sub Divison:*</h6>
                      <div class="form-group">
                      <b-form-select placeholder="Gender" v-model="product.categories" :options="categoriesoptions"></b-form-select>
                      </div>
                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p>

                      </div>
                    </div>
                     <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">
                    </div>
                     <div class="form-group d-flex">
                      <div class="p-1" v-for="(image, index) in product.images">
                          <div class="img-wrapp">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>
                  </div>
                   </div> 
            <div class="modal-footer">
              <button @click="addProduct()" type="button" class="btn btn-primary" v-if="modal == 'new'">Save changes</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary" v-if="modal == 'edit'">Apply changes</button>
            </div>
          </div>
        </b-modal>
    
  </div>
</template>

<script>
// import { VueEditor } from "vue2-editor";
import { fb, db} from '../firebase';
// import swal from 'sweetalert';
export default {
  name: "Products",
  props: {
    msg: String
  },

  data(){
    return {
        products: [],
          options: [
          { value: null, text: 'Please select an option' },
          { value: '002', text: 'Male' },
          { value: '001', text: 'Female' },
          { value: '003', text: 'Electronics' },
        ],
        categoriesoptions: [
           { value: null, text: 'Please select an option' },
          { value: 'top', text: 'Top' },
          { value: 'fshirt', text: 'Formal Shirt' },
          { value: 'cshirt', text: 'Casual Shirt' },
          { value: 'jeans', text: 'Jeans' },
           { value: 'tees', text: 'T-shirt' },
          { value: 'tpant', text: 'Track Pant' },
          { value: 'fpant', text: 'Formal Pant' },
          { value: 'skirt', text: 'Skirt' },
          { value: 'jeggins', text: 'jeggins' },
          { value: 'sarees', text: 'Sarees' },
          { value: 'dupatas', text: 'Dupatas' },
        ],
        product: {
          name:null,
          description:null,
          selected:"",
          price:null,
          tags:[],
          images:[]
        },
        activeItem:null,
        modal: null,
        tag: null
    }
  },

  firestore(){
      return {
        products: db.collection('products'),
      }
  },
  methods:{

    deleteImage(img,index){

      let image = fb.storage().refFromURL(img);

      this.product.images.splice(index,1);

      image.delete().then(function() {
        console.log('image deleted');
      }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('an error occurred');
      });

    },

    addTag(){
       this.product.tags.push(this.tag);
       this.tag = "";
    },
    uploadImage(e){

      if(e.target.files[0]){
        
          let file = e.target.files[0];
    
          var storageRef = fb.storage().ref('products/'+ Math.random() + '_'  + file.name);
    
          let uploadTask  = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {
            
          }, (error) => {
            // Handle unsuccessful uploads
          }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
            });

          });

      }




    },
    fetchCategories(){
      this.categoriesoptions.length=0;
      db.collection("categories").where("value","==",this.product.selected).get().then((querySnapshot)=>{
    querySnapshot.forEach((doc)=> {
        this.categoriesoptions.push(doc.data())
         });
  })
    },

    reset(){
      this.product = {
          name:null,
          description:null,
          price:null,
          tags:[],
          images:[]
      }
    },

    addNew(){
      this.reset();
     this.modal = 'new';
     this.$bvModal.show('modal-1')
    },
    updateProduct(){
        this.$firestore.products.doc(this.product.id).update(this.product);
          Toast.fire({
            type: 'success',
            title: 'Updated  successfully'
          })

           $('#product').modal('hide');
    },

    editProduct(product){
        this.modal = 'edit';
        this.product = product;
    
       this.$bvModal.show('modal-1')
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
          
          this.$firestore.products.doc(doc.id).delete()

          Toast.fire({
            type: 'success',
            title: 'Deleted  successfully'
          })

        
        }
      })


        
    },
    readData(){

      
     
    },
    addProduct(){
      
      this.$firestore.products.add(this.product);
      
          Toast.fire({
            type: 'success',
            title: 'Product created successfully'
          })

      $('#product').modal('hide');
    }

  
  },
  created(){
  

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.img-wrapp{
  position: relative;
}
.img-wrapp span.delete-img{
    position: absolute;
    top: -14px;
    left: -2px;
}
.img-wrapp span.delete-img:hover{
  cursor: pointer;
}

</style>
