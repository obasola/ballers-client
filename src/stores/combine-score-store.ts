import { defineStore } from 'pinia'
import axios from 'axios'
import CombineScores from '../domain/domainInterfaces';

const url = 'http://localhost:3000'

type CombineScore = {
  id: number,
  fortyTime: number,
  tenYardSplit: number,
  twentyYard_shuttle: number,
  threeCone: number,
  verticalLeap: number,
  broadJump: number,
  playerId: number
}

type State = {
  score: CombineScore
  scores: Array<CombineScore[]>
}

export const useTeamStore = defineStore('CombineScore', {
  state: (): State => ({
    combineScore: {
      id: 0,
      fortyTime: 0,
      tenYardSplit: 0,
      twentyYard_shuttle: 0,
      threeCone: 0,
      verticalLeap: 0,
      broadJump: 0,
      playerId: 0
    }
    scores: []
  }),
  getters: {
    getScore(state) {
      return state.score
    },
    getScores(state) {
      return state.scores
    }
  },
  actions: {
    async fetchScores() {
      try {
        const data = await axios.get(url + '/scores')
        this.scores = data.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }
})
