// app.js
import schedule from 'node-schedule'
import {
  downloadMoviesList,
  uploadMoviesData,
} from './api/S3'
import fetchDataByName from './api/OMDB'
import sendMail from './api/Email'

schedule.scheduleJob('0 0 0 1 * *', async () => {
  try {
    const movieList = await downloadMoviesList()
    const dataArray = movieList.split(/\r?\n/)

    const noMetadataDataArray = dataArray.map((item) => {
      return item.replace(/ ?\(.*/, "")
    })

    const movieDataRequests = noMetadataDataArray.map((movieName) => {
      return fetchDataByName(movieName)
    })

    const movieData = await Promise.all(movieDataRequests)

    const filteredMovieData = movieData.filter((item) => {
      return item.Response === 'True'
    })

    await uploadMoviesData(filteredMovieData)

    sendMail('Updated your movie list!', JSON.stringify(movieData))
  } catch(error) {
    console.log(error)
    sendMail('Failed to update film storage!', error.toString())
  }
})
