<template>

  <div >

    <nav class="mb-4" style="display: flex; align-items:center">
      <div style="flex: 1">
        <h1>SIGIRES-INIFAP</h1>
      </div>
      <div v-on:click="toggleMenu" style=" background-image: url(/imagenes/admin.png); background-size: contain; cursor:pointer; border-radius: 50%; width: 50px; height: 50px ; position: relative; ">
        <ul v-if="isActive" style=" list-style: none; background: white; position: absolute; top:100%; z-index:1; min-width: 300px; left:100%; transform: translateX(-300px) translateY(8px); box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; border-radius:16px">
          <li style="padding:12px 20px">
            Perfil
          </li>
          <li v-on:click="onLogout" style="padding:12px 20px">
            Cerrar sesión
          </li>
        </ul>
      </div>
    </nav>

    <router-view></router-view>
  </div>

  
</template>

<script>
import { TokenService } from '@/auth/services/TokenService';
import Swal from 'sweetalert2'; 

export default {
  data() {
    return {
      isActive: false
    };
  },
  methods: {
    toggleMenu() {
      this.isActive = !this.isActive;
    },

    async onLogout() {
      const result = await Swal.fire({
        title: '¿Estás seguro de cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '<span style="color:white;">Sí, cerrar sesión</span>',
        cancelButtonText: '<span style="color:white;">No</span>'
        
      });

      if (result.isConfirmed) {
        TokenService.clear(); // Limpia el token si el usuario confirma
        this.$router.push({ name: 'login' }); // Redirecciona al login
      }
    }
  }
};
</script>
