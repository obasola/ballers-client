<template>
  <template>
    <div>
      <h2>List Teams</h2>

      <DataTable
        :value="customers"
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
        <Column field="name" header="Name" style="width: 25%"></Column>
        <Column
          field="country.name"
          header="Country"
          style="width: 25%"
        ></Column>
        <Column field="company" header="Company" style="width: 25%"></Column>
        <Column
          field="representative.name"
          header="Representative"
          style="width: 25%"
        ></Column>
      </DataTable>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

import axios from 'axios'
import { useTeamStore } from 'src/stores/team-store'
import MsgHelper from 'src/quasar-msg-helper'
const selectedRow = ref([])
let teamStore = useTeamStore()
const msgHelper = new MsgHelper()
const router = useRouter()

onMounted(() => {
  teamStore = useTeamStore()

  getData()
})

function newTeam() {
  router.push({ path: '/editTeam?param=add' })
}

async function getData() {
  // alert('getting data');

  await axios
    .get('http://localhost:3000/teams')
    .then((response) => {
      teamStore.teams = response.data

      // alert('data = ' + teams.value);
    })
    .catch((e) => {
      msgHelper.alert('error: ' + e)
    })
}
function editTeam() {
  console.log('selection = ' + selectedRow.value)

  msgHelper.alert('selection = ' + selectedRow.value)
  router.push({ path: '/editTeam' })
}

// const rows: QTableProps['rows'] = teams;

const columns: QTableProps['columns'] = [
  {
    name: 'id',
    align: 'right',
    label: 'ID',
    field: 'id',
    sortable: true
  },
  {
    name: 'name',
    align: 'left',
    label: 'Name',
    field: 'name',
    sortable: true
  },
  {
    name: 'city',
    align: 'left',
    label: 'City',
    field: 'city',
    sortable: true
  },
  {
    name: 'state',
    align: 'left',
    label: 'State',
    field: 'state',
    sortable: true
  },
  {
    name: 'conference',
    align: 'left',
    label: 'Conference',
    field: 'conference',
    sortable: true
  }
]
</script>
