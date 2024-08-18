<template>
  <!-- Contenedor principal de la aplicación -->
  <div class="app">
    <!-- Componente de barra de navegación superior -->
    <AppTopbar/>
    <!-- Div que contiene el sidebar y el contenido principal -->
    <div class="content">
      <!-- Sidebar de la aplicación -->
      <app-sidebar/>
      <!-- Area principal donde se renderiza el contenido dinámico -->
      <main >
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';
</script>

<style lang="scss">
/* Estilos SCSS */
:root {
  --light: #f1f5f9; // Color de fondo claro
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira Sans', sans-serif; // Fuente predeterminada
}

/* Estilo para el cuerpo de la página */
body {
  background-color: var(--light); // Aplica el color de fondo definido anteriormente
}

/* Estilo para botones */
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none; // Elimina el fondo predeterminado de los botones
}

/* Estilo para el contenedor principal de la aplicación */
.app {
  display: flex;
  flex-direction: column; // Organiza los hijos en una columna
  height: 100vh; // Asegura que el contenedor ocupe toda la altura de la ventana
}

/* Estilo para el contenido principal que incluye el sidebar y el área de contenido */
.content {
  display: flex;
  flex-direction: row; // Organiza los hijos en una fila
  flex-grow: 1; // Permite que el contenido principal crezca para llenar el espacio disponible
}

/* Estilo para el sidebar */
.sidebar {
 
  flex: 0 0 auto; // Evita que el sidebar cambie de tamaño
}

/* Estilo para el área de contenido principal */
.main {
 
  flex: 1 1 0; // Permite que el contenido principal crezca para ocupar el espacio restante
  padding: 10rem; // Espaciado alrededor del contenido principal

  /* Regla de medios para ajustar el espaciado en pantallas pequeñas */
  @media (max-width: 968px) {
    padding-left: 1rem; // Ajusta el espaciado a la izquierda en pantallas pequeñas
  }
}
</style>


