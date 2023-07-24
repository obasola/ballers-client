import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:3000'

type Player = {
  id: number
  firstName: string
  lastName: string
  age: number
  height: number
  weight: number
  handSize: number
  armLength: number
  homeCity: string
  homeState: string
  university: string
  pickId: number
  position: string
}

type State = {
  player: Player
  players: Array<Player[]>
}

export const usePickStore = defineStore('player', {
  state: (): State => ({
    player: {
      id: 0,
      firstName: '',
      lastName: '',
      age: 0,
      height: 0,
      weight: 0,
      handSize: 0,
      armLength: 0,
      homeCity: '',
      homeState: '',
      university: '',
      pickId: 0,
      position: ''
    },
    players: []
  }),
  getters: {
    getPlayer(state) {
      return state.player
    },
    getPlayers(state) {
      return state.players
    }
  },
  actions: {
    async fetchPlayers() {
      try {
        const data = await axios.get(url + '/players')
        this.players = data.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }
})
