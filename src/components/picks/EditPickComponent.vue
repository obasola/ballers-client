<template>
  <q-page>
    <h2>Edit Pick</h2>
    <div>
      <q-form class="q-gutter-md">
        <q-input
          v-model="pickStore.pick.selectionYear"
          label="Draft Year *"
          hint="The year the draft pick is available"
        />
        <q-input v-model="pickStore.pick.player" label="Player Name *" />
        <q-select
          filled
          use-input
          hide-selected
          fill-input
          v-model="pickStore.pick.teamId"
          :options="teamOptionsList"
          label="Single"
          style="width: 250px"
        />
        <q-input
          v-model="pickStore.pick.selectionRound"
          type="text"
          label="Round"
        />

        <q-input
          v-model="pickStore.pick.selectionNumber"
          type="text"
          label="Pick Number"
        />

        <q-input
          v-model="pickStore.pick.selectionPickFrom"
          type="text"
          label="Pick Received From"
        />

        <q-input
          v-model="pickStore.pick.selectionPickTo"
          type="text"
          label="Pick Sent To"
        />
        <q-input
          v-model="pickStore.pick.combineScore"
          type="number"
          label="Combine Score"
        />
        <div>
          <q-btn
            v-on:click="submit"
            label="Submit"
            type="submit"
            color="primary"
          />
          <q-btn
            v-on:click="reset"
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import axios from 'axios'

import { usePickStore } from 'src/stores/pick-store'
import PickDataService from 'src/services/PickDataService'
import { QInput } from 'quasar'
import { onMounted } from 'vue'

const pickStore = usePickStore()
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

const pickService = new PickDataService()

onMounted(() => {
  pickStore.pick.playerId
})

function submit() {
  alert('Submit clicked')
  pickService.create(pickStore.pick)
}
function reset() {
  alert('Reset clicked')
}

async function getData() {
  // alert('getting data');

  await axios
    .get('http://localhost:3000/picks')
    .then((response) => {
      const records: Array<Team> = response.data
      return records
    })
    .catch((e) => {
      alert('error: ' + e)
    })
}
</script>
