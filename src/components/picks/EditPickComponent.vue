<template>
  <div class="card flex flex-wrap gap-3 p-fluid">
    <div class="card flex justify-content-center">
      <Dropdown
        v-model="selectedTeam"
        :options="teamOptionsList"
        optionLabel="Team"
        placeholder="Select a Team"
        class="w-full md:w-14rem"
      />
    </div>
    <div class="flex-auto">
      <label for="pname" class="font-bold block mb-2"> Player </label>
      <Input v-model="pickStore.pick.playerName" inputId="playername" />
    </div>
    <div class="flex-auto">
      <label for="pickRound" class="font-bold block mb-2"> `Round` </label>
      <InputNumber
        v-model="pickStore.pick.selectionRound"
        inputId="pickRound"
        :useGrouping="false"
      />
    </div>
    <div class="flex-auto">
      <label for="pickNumber" class="font-bold block mb-2"> `Number` </label>
      <InputNumber
        v-model="pickStore.pick.selectionNumber"
        inputId="pickNumber"
        :useGrouping="false"
      />
    </div>
    <div class="flex-auto">
      <label for="pickYear" class="font-bold block mb-2"> `Round` </label>
      <Input
        v-model="pickStore.pick.selectionYear"
        inputId="pickYear"
        :useGrouping="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'

import { usePickStore } from 'src/stores/pick-store'
import { ref, onMounted } from 'vue'
import Team from '@/domain/ITeam'
import pickService from 'src/services/TeamDataService.js'
const pickStore = usePickStore()
const selectedTeam = ref(0)
const teamOptionsList = [
  {
    value: 12,
    label: 'Arizona Cardinals'
  },
  {
    value: 13,
    label: 'Atlanta Falcons'
  },
  {
    value: 15,
    label: 'Baltimore Ravens'
  },
  {
    value: 16,
    label: 'Cincinnati Bengals'
  },
  {
    value: 14,
    label: 'Cleveland Browns'
  },
  {
    value: 17,
    label: 'Detroit Lions'
  },
  {
    value: 11,
    label: 'Kansas City Chiefs'
  }
]

onMounted(() => {
  getPickById()
})

function submit() {
  alert('Submit clicked')
  pickService.create(pickStore.pick)
  console.log('Pick saved')
}
async function getPickById() {
  axios
    .get('http://localhost:3000/pick/' + pickStore.pick.playerId)
    .then((response) => {
      pickStore.pick = response.data
      return pickStore.pick
    })
    .catch((e) => {
      alert('error: ' + e)
    })
}
function reset() {
  alert('Reset clicked')
}

async function getData() {
  await axios
    .get('http://localhost:3000/picks')
    .then((response) => {
      pickStore.picks = response.data
      return pickStore.picks
    })
    .catch((e) => {
      alert('error: ' + e)
    })
}
</script>
