<script setup>
import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { ref } from "vue";
const userStore = useUserStore();
const databasesStore = useDatabaseStore();

databasesStore.getUrls();

const url = ref('')

const handleSubmit = () => {
  // validacion de url ...
  databasesStore.addUrl(url.value)
}

</script>
<template>
  <div>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="ingrese URL" v-model="url">
      <button type="submit">Agregar</button>
    </form>

    <p v-if="databasesStore.loadingDoc">loading docs...</p>
    <ul v-else>
      <li v-for="item of databasesStore.documents" :key="item.id">
        {{ item.id }}
        <br />
        {{ item.name }}
        <br />
        {{ item.shor }}
        <br>
        <button @click="databasesStore.deleteUrl(item.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>
