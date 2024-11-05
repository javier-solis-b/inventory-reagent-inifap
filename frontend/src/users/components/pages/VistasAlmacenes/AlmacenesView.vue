<!-- RecursosView.vue -->
<template>
    <div id="recursos-view">
      <div>
        <h3 class="fw-bold mb-0 text-color" style="color: #0c934a;">Almacenes</h3>
      </div>
      
      <nav aria-label="Tab de Almacenes">
        <ul>
          <li><router-link to="/recursos/soluciones">Histología</router-link></li>
          <li><router-link to="/recursos/reactivos">Alacena</router-link></li>
          <li><router-link to="/recursos/solventes">Refrigerador</router-link></li>
        </ul>
      </nav>
      
      <router-view></router-view>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AlmacenesView'
  }
  </script>
  
  <style scoped>
  #recursos-view {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  nav ul {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  
  nav li {
    margin-right: 20px;
  }
  
  nav a {
    text-decoration: none;
    color: #333;
  }
  
  .router-link-active {
    font-weight: bold;
    color: #007bff;
  }
  </style>
  