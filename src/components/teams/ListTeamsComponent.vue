<template>
  <DataTable
    v-model:selection="selectedTeam"
    @rowSelect="editTeam"
    :value="teamStore.teams"
    paginator
    :rows="5"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    tableStyle="min-width: 50rem"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
  >
    <template #paginatorstart>
      <Button type="button" icon="pi pi-refresh" text />
    </template>
    <template #paginatorend>
      <Button type="button" icon="pi pi-download" text />
    </template>
    <Column selectionMode="single" headerStyle="width: 3rem"></Column>
    <Column
      field="teamStore.team.name"
      header="Name"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="teamStore.team.city"
      header="City"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="teamStore.team.selectionState"
      header="State"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="teamStore.team.conference"
      header="Conference"
      sortable
      style="width: 25%"
    ></Column>
  </DataTable>

  <div class="card">
    <button :onClick="addTeam">Add</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTeamStore } from 'src/stores/team-store'
import { ref, reactive, onMounted } from 'vue'

const selectedTeam = ref()
const router = useRouter()
const teamStore = useTeamStore()

onMounted(() => {
  teamStore.fetchTeams()
})

function addTeam() {
  router.push({ path: '/editTeam?param=add' })
}

function editTeam() {
  alert('selected row: ' + selectedTeam.value)
  const teamSelection = reactive(selectedTeam.value)
  teamStore.stageTeamForEditing(teamSelection)
  router.push({ path: '/editTeam?id=' + teamSelection.id })
}
</script>
