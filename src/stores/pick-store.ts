import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:3000'

type Pick = {
  id: number
  teamId: number
  playerId: number
  playerName: string
  selectionRound: number
  selectionNumber: number
  selectionYear: string
  selectionPickFrom: string
  selectionPickTo: string
  combineScore: number
}

type State = {
  pick: Pick
  picks: Array<Pick[]>
}

export const usePickStore = defineStore('pick', {
  state: (): State => ({
    pick: {
      id: 0,
      teamId: 0,
      playerId: 0,
      playerName: '',
      selectionRound: 0,
      selectionNumber: 0,
      selectionYear: '',
      selectionPickFrom: '',
      selectionPickTo: '',
      combineScore: 0
    },
    picks: []
  }),
  getters: {
    getPick(state) {
      return state.pick
    },
    getPicks(state) {
      return state.picks
    }
  },
  actions: {
    async fetchPicks() {
      try {
        const data = await axios.get(url + '/picks')
        this.picks = data.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async stagePickForEditing(row: Pick) {
      this.pick.id = row.id
      this.pick.selectionNumber = row.selectionNumber
      this.pick.selectionRound = row.selectionRound
      this.pick.selectionYear = row.selectionYear
      this.pick.teamId = row.teamId
      this.pick.playerId = row.playerId
      this.pick.combineScore = row.combineScore
      this.fetchPlayerName(row.id)
    },

    async fetchPlayerName(id: number) {
      try {
        const data = await axios.get(url + '/player/' + id)
        this.pick.playerName = data.data.firstName + ' ' + data.data.lastName
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }
})
