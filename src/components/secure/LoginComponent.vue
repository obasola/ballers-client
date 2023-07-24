<script setup lang="ts">
import { reactive } from 'vue'
import { usePersonStore } from './../../src/stores/personStore'

const personStore = reactive(usePersonStore())
</script>
<template>
  <div>
    <fieldset>
      <legend>Login Form</legend>
      <form>
        <div class="input-group mb-3 w-25">
          <label for="username">Username</label>
          <input
            id="username"
            v-model="personStore.userName"
            type="text"
            class="form-control"
          />
        </div>
        <div class="input-group mb-3 w-25">
          <label class="form-label" for="pswd">Password</label>
          <input
            id="pswd"
            v-model="personStore.password"
            type="password"
            class="form-control"
          />
        </div>
        <div class="input-group mb-3 w-45">
          <button class="btn btn-primary" style=".padByTwo">Login</button>
          <button class="btn btn-secondary" style=".padByTwo">Register</button>
        </div>
      </form>
    </fieldset>
  </div>
</template>

<style>
.padByTwo {
  padding: 0.9em;
}
fieldset {
  border: solid 1px gray;
  padding-top: 5px;
  padding-right: 12px;
  padding-bottom: 10px;
  padding-left: 12px;
}
legend {
  float: left;
  width: inherit;
}
</style>
