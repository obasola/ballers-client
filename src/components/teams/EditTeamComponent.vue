<template>
  <q-page>
    <h2>Edit Team Data</h2>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" flat bordered>
        <q-card-section horizontal>
          <q-img
            class="col-5"
            src="src/images/kc_chiefs.jpeg"
            width="190px"
            height="160px"
          />
        </q-card-section>
        <q-separator vertical />
      </q-card>
      <q-card>
        <q-card-section>
          <div class="q-pa-md" style="max-width: 400px">
            <q-form @submit="submit" @reset="reset" class="q-gutter-md">
              <q-input
                v-if="4"
                v-model="teamStore.team.name"
                label="Team name *"
              />
              <q-select
                v-if="param === 'UPD'"
                filled
                v-model="teamStore.team.id"
                :options="teamOptionsList"
                option-label="teamName"
                option-value="id"
                label="Team"
                style="width: 250px"
              />
              <q-input v-model="teamStore.team.city" type="text" label="City" />

              <q-select
                filled
                v-model="teamStore.team.state"
                :options="americanStates"
                option-label="name"
                option-value="value"
                label="State"
                style="width: 250px"
              />

              <q-select
                filled
                v-model="teamStore.team.conference"
                :options="conferenceList"
                option-label="name"
                option-value="value"
                label="Conference"
                style="width: 250px"
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
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import TeamEntity from 'src/domain/domainInterfaces'

import Util from 'src/domain/util.js'
import TeamDataService from 'src/services/TeamDataService'
import { reactive, ref } from 'vue'
import QuasarMsgHelper from '../../quasar-msg-helper'
import { useTeamStore } from 'src/stores/team-store'

const utils = new Util()

const conferenceList = utils.getConferenceList()
const teamOptionsList = utils.getTeamList()
const americanStates = utils.getStateList()

const messageHelper = new QuasarMsgHelper()
const teamStore = useTeamStore()

const param = ref<string>('UPD')
const service = new TeamDataService()

const submitted = ref<boolean>(true)

function confirmSave() {
  messageHelper.confirm(
    'Are you sure you want to save the save the data changes?'
  )
}
async function submit() {
  confirmSave
  await service
    .create(teamStore)
    .then((response) => {
      console.log(response)
      submitted.value = true
    })
    .catch((e) => {
      console.log(e)
    })
}
function reset() {
  alert('Reset clicked')
}
</script>
