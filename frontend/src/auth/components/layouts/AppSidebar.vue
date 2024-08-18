<template>
    <aside :class="`${is_expanded && 'is-expanded'} `">
      <link
        href="https://fonts.googleapis.com/css?family=Material+Icons"
        rel="stylesheet"
      />
  
      <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-icons">keyboard_double_arrow_right</span>
        </button>
      </div>
      <h3>Menú</h3>
      <div class="menu">
          <router-link class="button" to="/dashboard">
              <span class="material-icons">home</span>
              <span class="text">Inicio</span> 
          </router-link>
          <router-link class="button" to="/">
              <span class="material-icons">warehouse</span>
              <span class="text">Almacenes</span>
          </router-link>
          <router-link class="button" to="/">
              <span class="material-icons">kitchen</span>
              <span class="text">Refrigeradores</span>
          </router-link>
          <router-link class="button" to="/">
              <span class="material-icons">science</span>
              <span class="text">Solventes</span>
          </router-link>
          <router-link class="button" to="/usuarios">
              <span class="material-icons">group</span>
              <span class="text">Usuarios</span>
          </router-link>
      </div>
    </aside>
  </template>
  
  <script setup>
import { ref } from "vue";

const is_expanded = ref(false);


const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
};


</script>

  
<style lang="scss" scoped>

aside {
  display: flex;
  flex-direction: column;
  background-color: var(--dark);
  color: var(--light);
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  transition: 0.2s ease-out;

  .flex {
    flex: 1 1 0%;
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;
    top: 0;

    .menu-toggle {
      transition: 0.2s ease-in-out;

      .material-icons {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--primary);
          transform: translateX(0.9rem);
          transition: 0.2s ease-out;
        }
      }
    }
  }

  h3 .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      cursor: pointer;
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.7rem 1rem;
      transition: 0.2s ease-out;

      &:hover {
        background-color: var(--dark-alt);

        .material-icons,
        .text {
          color: var(--primary);
        }
      }
    }

    .material-icons {
      font-size: 1.5rem;
      color: var(--light);
      margin-right: 1rem;
      transition: 0.2s ease-out;
    }

    .text {
      color: var(--light);
      transition: 0.2s ease-out;
    }
  }

  &.is-expanded {
    width: 200px;

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3 .button .text {
      opacity: 1;
    }
  }

  &:not(.is-expanded) {
    h3 ,.button .text {
      opacity: 0;
    }
  }
  @media (max-width: 568px) {
    
    &.is-expanded {
      width: 500px; 
    }
  }
  
}


</style>
