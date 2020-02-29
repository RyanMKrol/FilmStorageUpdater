import fetch from 'node-fetch'
import { apiCall } from './Utils/ApiUtils'
import omdbCredentials from './../../credentials/omdbCredentials.json'

async function fetchDataByName(searchItem) {
  const apiKey = omdbCredentials.apiKey
  const searchInput = encodeURI(searchItem)
  const apiEndpoint = `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchInput}`

  const omdbData = await apiCall(apiEndpoint)

  return isMovieDataValid(omdbData) ? omdbData : undefined
}

function isMovieDataValid(item) {
  if (
    !item ||
    !item.Title ||
    !item.Runtime ||
    !item.Director ||
    !item.Poster ||
    item.Poster === 'N/A' ||
    !item.imdbID
  ) {
    return false
  }

  return true
}

export default fetchDataByName
