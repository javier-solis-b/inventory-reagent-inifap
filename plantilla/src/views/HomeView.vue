<template>
  <div class="container w-75 mt-5 rounded shadow" style="background-color: #90ee90;">
    <div class="row align-items-stretch">
      <div class="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
      <div class="col bg-white p-5 rounded-end">
        <div class="text-end"></div>
        <h2 class="fw-bold text-center py-2">Bienvenido</h2>
        <h5 class=" text-center">Sistema de Gestión de Inventarios de Reactivos y Soluciones(SIGIRES)</h5>

        <!-- LOGIN -->
        <form action="#">
          <div class="mb-4">
            <label for="user" class="form-label">Usuario:</label>
            <input type="user" class="form-control" name="user">
          </div>
          <div class="mb-4">
            <label for="password" class="form-label">Contraseña:</label>
            <input type="password" class="form-control" name="password">
          </div>
         
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">Iniciar sesión</button>
          </div>
          <div class="my-3">
            <span>¿Olvidaste tu contraseña? <a href="#">Recupérala</a></span>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background-image: url('../assets/img/fondolog.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
