<template>
  <body class="container-fluid">
    <main class="row">
      <section class="col-md-6" id="panel-left">
        <div class="col-12 logo-container d-flex flex-column justify-content-center align-items-center">
          <h1 class="w-bold text-center">SIGIRES INIFAP</h1>
          <p class="col-12 text-center description mb-3">
            Bienvenido, al sistema de gestión <br />
            de inventarios de reactivos y soluciones.
          </p>
          <img src="/imagenes/entrada.jpg" alt="" style="width: 500px; height: auto; border-radius: 4px; background-color: rgba(255, 255, 255, 0.7);" />
        </div>
      </section>

      <section class="col-md-6" id="panel-right">
        <div class="container justify-content-center align-items-center col-12">
          <div class="col-12 text-center justify-content-center aling-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" fill="#0c934a" class="bi bi-door-open" viewBox="0 0 16 16">
            <path d="M8.5 10c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
            <path d="M10.828.122A.5.5 0 0 1 11 .5V1h.5A1.5 1.5 0 0 1 13 2.5V15h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V1.5a.5.5 0 0 1 .43-.495l7-1a.5.5 0 0 1 .398.117M11.5 2H11v13h1V2.5a.5.5 0 0 0-.5-.5M4 1.934V15h6V1.077z"/>
          </svg>
          </div>
          <div class="row mb-5">
            <h2 class="col-12 text-center">Iniciar sesión</h2>
          </div>
          <div class="row">
            <form @submit.prevent="handleFormSubmit" class="col-12 col-md-8 offset-md-2">
              <div class="form-group">
                <input v-model="name" class="form-control" name="email" id="email" placeholder="Usuario" required />
              </div>
              <br />
              <div class="form-group">
                <input v-model="password" type="password" class="form-control" name="password" id="password" placeholder="Contraseña" required />
              </div>
              <div class="form-group text-center pt-4">
                <input v-btn v-on:click="onLogin()" type="submit" class="btn btn-primary" value="Ingresar" />
              </div>
            </form>
          </div>
          <div class="row mt-5">
            <div v-if="errorMessage" class="error-message-container">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</template>

<script>
import { AuthService } from "@/auth/Services/AuthService";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      name: "",
      password: "",
      errorMessage: "", // Propiedad para almacenar el mensaje de error
    };
  },
  setup() {
    const router = useRouter(); // Utiliza la función useRouter de Vue Router
    return { router }; // Hace que router esté disponible en la plantilla
  },
  methods: {
    handleFormSubmit(event) {
      event.preventDefault();
      this.onLogin();
    },
    async onLogin() {
      try {
        const response = await AuthService.login(this.name, this.password);
        if (response.token) {
          this.router.push({ name: "dashboard" });
        } else {
          throw new Error("Credenciales incorrectas");
        }
      } catch (error) {
        this.errorMessage =
          "Error, ingresaste el usuario o contraseña incorrecta, por favor ingresa datos válidos";
      }
    },
  },
};
</script>

<style scoped>
.logo-container {
  background-color: transparent; 
  
}

.container {
  max-height: calc(
    100vh - 56px
  ); /* Ajusta según el tamaño de tu barra de navegación */
  margin: auto; /* Centra horizontalmente */
  padding: 0; /* Elimina padding */
}

.row {
  height: 100%; /* Asegura que la fila ocupe todo el espacio vertical */
}

.col {
  height: 100%; /* Asegura que la columna ocupe todo el espacio vertical */
}

.card {
  height: 100%; /* Asegura que la tarjeta ocupe todo el espacio vertical */
}
.error-message-container {
  background-color: red;
  color: white;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
}

.text1 {
  text-align: center;
  padding: 15px;
}

.my-button {
  padding: 10px 160px;
  background-color: #018a4d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.my-button:hover {
  background-color: #45a049;
}

.my-button:active {
  background-color: #3e8e41;
}
@media (max-width: 768px) {
  .form-label {
    font-size: 14px;
  }

  .my-button {
    padding: 8px 120px;
  }
}

.fw-normal {
  font: 150% sans-serif;
}
* {
  font-family: "Red Hat Display", sans-serif;
}
html,
body,
main {
  height: 100%;
}
#panel-left {
  display: flex !important;
  align-items: center;
  background-color: #0c934a;
}
#panel-right {
  display: flex !important;
  align-items: center;
  background-color: #f1f6f9;
}

h1 {
  color: #ffd700;
  font-size: 60px;
  font-weight: 900;
}
h2 {
  color: #0c934a;
  font-size: 40px;
  font-weight: 700;
}

.description {
  color: #ffff;
  font-size: 24px;
  font-weight: 400;
}

#panel-left .logo-container svg {
  width: 220px;
}

#panel-right form input {
  background-color: unset;
  border: 0;
  border-bottom: 2px solid #0c934a;
  border-radius: 0;
  font-weight: 400;
}

.btn.btn-primary {
  width: 430px; 
  border: 0 !important;
  border-radius: 50px !important;
  background-color: #0c934a !important;
  padding: 15px 40px !important;
  color: #fff !important;
  font-weight: 400 !important;
}

@media only screen and (max-width: 767px) {
  #panel-left {
    display: none !important;
  }
}
</style>
