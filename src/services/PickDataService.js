import http from '../http-common'
import axios from 'axios'
import pickStore from '../stores/pick-store'
class PickDataService {

  getAll() {
    await axios
      .get('http://localhost:3000/picks')
      .then((response) => {
        pickStore.picks = response.data
        console.log("picks data: "+response.data)
        return response.data
      })
      .catch((e) => {
        alert('error: ' + e)
      })
    }
  }

  get(id) {
    return http.get(`/pick/${id}`)
  }

  create(data) {
    return http.post('/picks', data)
  }

  update(id, data) {
    return http.put(`/pick/${id}`, data)
  }

  delete(id) {
    return http.delete(`/pick/${id}`)
  }

  deleteAll() {
    return http.delete('/picks')
  }

  findByName(name) {
    return http.get(`/picks?name=${name}`)
  }

  async getTeamListDropdown() {
    await axios
      .get('http://localhost:3000/teams')
      .then((response) => {
        pickStore.teams = response.data

        // alert('data = ' + picks.value);
      })
      .catch((e) => {
        alert('error: ' + e)
      })
  }
}
export default PickDataService
