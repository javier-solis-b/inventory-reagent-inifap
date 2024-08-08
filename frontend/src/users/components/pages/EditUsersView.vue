<template>
    <v-form @submit.prevent="onSubmit">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field label="Nombre" v-model="user.name"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-switch
                        v-model="user.isAdmin"
                        :label="` ${user.isAdmin ? 'Administrador' : 'No es Administrador'} `"
                        off-value="false"
                        on-value="true"
                        color="green"
                    ></v-switch>
                </v-col>
                <v-col cols="12">
                    <v-btn type="submit" color="primary">Actualizar</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import backend from '@/backend.js';

export default {
    data() {
        return {
            user: {
                name: '',
                isAdmin: false, // Inicializa isAdmin como false
            },
        };
    },
    async mounted() {
        const userId = this.$route.params.id;
        const userData = (await backend.get(`usuarios/${userId}`)).data;
        // Convertir el valor de isAdmin a booleano
        this.user = {
            ...userData,
            isAdmin: userData.isAdmin === 1, // Asumiendo que 1 indica administrador
        };
    },
    methods: {
        async onSubmit() {
            try {
                const response = await backend.patch(`usuarios/${this.$route.params.id}`, {
                    name: this.user.name,
                    isAdmin: this.user.isAdmin ? 1 : 0, // Convierte el valor booleano a entero
                });
                console.log(response);
            } catch (error) {
                console.error("Error al actualizar el usuario:", error);
            }
        },
    },
};
</script>

<style scoped>

</style>
