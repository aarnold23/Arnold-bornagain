const lightBulb= {
   data(){
    return{
       switchOn:false,
       
    }
      },
     methods: {
         switchMethod:function(){
            this.switchOn = !this.switchOn
         
        }
     }
     }
     Vue.createApp(lightBulb).mount('#app')

//every vue.js app is bootstraped by creating a root vue instance with the vue constructor function
//Vue.createApp({/*Porperties*/})
//A vue instance is essentially a ViewModel as defined inthe M-V-VM pattern
//view<==============>viewModel<====>model
//      Databinding                     BusinessLogicandData
//    Presentation 
// string interpolaters 
