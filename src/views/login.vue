 <template>
 <div class="container mt-5">
            <b-tabs id="tab" content-class="mt-3" align="center">
              <b-tab title="Login" active>
                <!-- <img class="modal-img" src="../assets/Images/2.jpg"> -->
              
                  <form>
                    <div class="form-group">
                      <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email"  required>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                    </div>
                    <p>Forgot Pasword?<span   @click="forgotpassword" class="frg"> Click Here</span></p>
                    <button type="submit" @click="login" class="btn btn-primary mr-2">Sign In</button>
                    <button type="submit" @click="close" class="btn btn-primary">Close</button>
                  </form>
                
              </b-tab>
              <b-tab title="Sign Up">
                  <form>
                         <div class="form-group">
                    <input type="text" v-model="name" class="form-control" placeholder="Enter Your Name" required>  
                         </div>
                    <div class="form-group"> 
                      
                      <input type="email" v-model="email1" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email" required>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="password1" class="form-control" id="exampleInputPassword1" placeholder="Password" required>
                    </div>
                    
                    
                    <button type="submit" @click="register" class="btn btn-primary mr-2">Sign Up</button>
                    <button type="submit" @click="close"  class="btn btn-primary">Close</button>
                  </form>
             
              </b-tab>
            </b-tabs>
          </div>
</template>
<script>
import {fb,db} from '../firebase'

import firebase from '../firebase'
  export default {
    name: "Navbar",
    props: {
      msg: String
    },
      data(){
      return {
          name:"",
          email:"",
          password:"",
          email1:"",
          password1:"",
          status:"0"
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
      close(){
        this.$bvModal.hide('modal-1')
      },
      
      forgotpassword(){
        var auth = fb.auth();
        // console.log(auth)
        // var emailAddress = this.email;
        auth.sendPasswordResetEmail(this.email).then(function() {
        alert("There is a reset link in your email address");
        }).catch(function(error) {
         console.log(error)
        })
      },
        login(){
       fb.auth().signInWithEmailAndPassword(this.email, this.password)
                        .then(() => {
                         this.$router.push('/')  
                        })
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                alert('Wrong password.');
                            } else {
                                alert(errorMessage);
                            }
                            console.log(error);
                    });

      },
      register(){
            fb.auth().createUserWithEmailAndPassword(this.email1, this.password1)
                .then((user) => {
                  alert("Sucess")
                      this.close();
                    db.collection("profiles").doc(user.user.uid).set({
                        name: this.name
                    })
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