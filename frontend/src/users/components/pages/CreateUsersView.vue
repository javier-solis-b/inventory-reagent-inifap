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
                    <v-text-field v-model="repeatedPassword" type="password" label="Verificar contraseña" required></v-text-field>
                </v-col>
                <v-col cols="12">
                    <!-- Checkbox para determinar si el usuario es administrador -->
                    <v-checkbox v-model="isAdmin" :label="'¿Este usuario es un administrador?'" true-value="true" false-value="false"></v-checkbox>
                </v-col>
                <v-col cols="12">
                    <v-btn type="submit" color="primary">
                        Crear usuario.
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import backend from '@/backend';

export default {
    data() {
        return {
            name: '',
            password: '',
            repeatedPassword: '', // Corrección aquí
            isAdmin: null, // Asegúrate de inicializar esta propiedad
        };
    },
    methods: {
        async onSubmit() {
    if(this.password !== this.repeatedPassword){
        alert('Las contraseñas no coinciden');
        return; // Detener la ejecución aquí
    }

    // Convertir el valor del checkbox a un entero
    const isAdminInt = this.isAdmin ? 1 : 0;

    await backend.post('usuarios', {
        name: this.name,
        password: this.password,
        isAdmin: isAdminInt, // Ahora isAdmin es un entero
    }).catch(error => {
        console.error('Error al crear el usuario:', error.response.data);
    });

    this.$router.push({name: 'usuarios'});
    console.log({
        name: this.name,
        password: this.password,
        repeatedPassword: this.repeatedPassword,
        isAdmin: isAdminInt, // Mostrar el valor como entero
    });
}

    }
}
</script>
