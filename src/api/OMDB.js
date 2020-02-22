import fetch from 'node-fetch'
import { apiCall } from './Utils/ApiUtils'
import omdbCredentials from './../../credentials/omdbCredentials.json'

async function fetchDataByName(searchItem) {
  const apiKey = omdbCredentials.apiKey
  const searchInput = encodeURI(searchItem)
  const apiEndpoint = `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`

  return apiCall(apiEndpoint)
}

export default fetchDataByName
