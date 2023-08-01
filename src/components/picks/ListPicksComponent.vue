<template>
  <DataTable
    v-model:selection="selectedPick"
    @rowSelect="editPick"
    :value="pickStore.picks"
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
      field="pickStore.pick.playerName"
      header="Name"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="pickStore.pick.selectionRound"
      header="Round"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="pickStore.pick.selectionNumber"
      header="Pick Nbr"
      sortable
      style="width: 25%"
    ></Column>
    <Column
      field="pickStore.pick.combineScore"
      header="Combine Score"
      sortable
      style="width: 25%"
    ></Column>
  </DataTable>

  <div class="card">
    <button :onClick="addPick">Add</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePickStore } from 'src/stores/pick-store'
import { ref, reactive, onMounted } from 'vue'

const selectedPick = ref()
const router = useRouter()
const pickStore = usePickStore()

onMounted(() => {
  pickStore.fetchPicks()
})

function addPick() {
  router.push({ path: '/editPick?param=add' })
}

function editPick() {
  alert('selected row: ' + selectedPick.value)
  const pickSelection = reactive(selectedPick.value)
  pickStore.stagePickForEditing(pickSelection)
  router.push({ path: '/editPick?id=' + pickSelection.id })
}
</script>
