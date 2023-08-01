import { defineStore } from 'pinia'
import axios from 'axios'
import CombineScores from 'src/domain/ICombineScore'

const url = 'http://localhost:3000'

type CombineScore = {
  id: number
  fortyTime: number
  tenYardSplit: number
  twentyYardShuttle: number
  threeCone: number
  verticalLeap: number
  broadJump: number
  playerId: number
}

type State = {
  combineScore: CombineScore
  combineScores: Array<CombineScore[]>
}

export const useTeamStore = defineStore('CombineScore', {
  state: (): State => ({
    combineScore: {
      id: 0,
      fortyTime: 0,
      tenYardSplit: 0,
      twentyYardShuttle: 0,
      threeCone: 0,
      verticalLeap: 0,
      broadJump: 0,
      playerId: 0
    },
    combineScores: new Array<CombineScores[]>()
  }),
  getters: {
    getScore(state) {
      return state.combineScore
    },
    getScores(state) {
      return state.combineScores
    }
  },
  actions: {
    async fetchScores() {
      try {
        const data = await axios.get(url + '/scores')
        this.combineScores = data.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }
})
