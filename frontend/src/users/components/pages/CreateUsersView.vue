<template>
    
    <v-form @submit.prevent="onSubmit">
       <v-container>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="name" label="Usuario" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="password" type="password" label="Contraseña" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="repeatedPaswword" type="password" label="Verificar contraseña" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-btn type="submit" color="primary">
                        Crear usuario
                    </v-btn>
                </v-col>
            </v-row>
       </v-container>
    </v-form>

</template>

<script>
    export default {

        data(){
           return{
            name:'',
            password: '',
            repeatedPaswword: '',
           }
        },

        methods:{
            onSubmit(){
                console.log({
                    name: this.name,
                    password: this.password,
                    repeatedPaswword: this.repeatedPaswword, 
                });
            }
        }
        

    }
</script>