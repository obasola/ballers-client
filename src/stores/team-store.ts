import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:3000'

type Team = {
  id: number
  name: string
  city: string
  state: string
  conference: string
}

type State = {
  team: Team
  teams: Array<Team[]>
}

export const useTeamStore = defineStore('team', {
  state: (): State => ({
    team: {
      id: 0,
      name: '',
      city: '',
      state: '',
      conference: ''
    },
    teams: []
  }),
  getters: {
    getTeam(state) {
      return state.team
    },
    getTeams(state) {
      return state.teams
    }
  },
  actions: {
    async fetchTeams() {
      try {
        const data = await axios.get(url + '/teams')
        this.teams = data.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }
})
