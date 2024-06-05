<template>
  <div class="card mx-auto">
    <div class="card-body">
      <form>
        <div class="mb-3 mt-2">
          <input
            type="user"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Ingrese su usuario"
          />
        </div>
        <div class="mb-3 mt-2">
          <input
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div class="d-grid">
            <button type="button" class="btn btn-primary">Ingresar al sistema</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComp",
};
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
</style>