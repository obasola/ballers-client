import { defineStore } from 'pinia'
import axios from 'axios'

const url = 'http://localhost:3000'

type Schedule = {
  id: number
  teamID: number
  opponentId: number
  scheduleWeek: number
  gameDate: Date
  gameCity: string
  gameStateProvince: string
  gameCountry: string
  gameLocation: string
  opponentConference: string
  opponentDivision: string
  winLostFlag: string
  homeOrAway: string
}

type State = {
  schedule: {
    id: number
    teamID: number
    opponentId: number
    scheduleWeek: number
    gameDate: Date
    gameCity: string
    gameStateProvince: string
    gameCountry: string
    gameLocation: string
    opponentConference: string
    opponentDivision: string
    winLostFlag: string
    homeOrAway: string
  }
  schedules: Array<Schedule[]>
}

export const useScheduleStore = defineStore('schedule', {
  state: (): State => ({
    schedule: {
      id: 0,
      teamID: 0,
      opponentId: 0,
      scheduleWeek: 0,
      gameDate: new Date(),
      gameCity: '',
      gameStateProvince: '',
      gameCountry: '',
      gameLocation: '',
      opponentConference: '',
      opponentDivision: '',
      winLostFlag: '',
      homeOrAway: ''
    },
    schedules: []
  }),
  getters: {
    getSchedule(state) {
      return state.schedule
    },
    getSchedules(state) {
      return state.schedules
    }
  },
  actions: {
    async fetchSchedules() {
      try {
        const data = await axios.get(url + '/schedules')
        this.schedules = data.data
      } catch (error) {
        alert(error)
        console.log(error)
      }
    }
  }
})
