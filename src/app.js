// app.js
import schedule from 'node-schedule'
import {
  downloadMoviesList,
  uploadMoviesData,
} from './api/S3'
import fetchDataByName from './api/OMDB'
import MailSender from 'noodlesmail'
import gmailCredentials from './../credentials/GmailCredentials.json'

const mailClient = new MailSender(gmailCredentials)
mailClient.setFrom('"FilmStorageUpdater" <ryankrol.m@gmail.com>')
mailClient.setTo('ryankrol.m@gmail.com')

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
      return item && item.Response === 'True'
    })

    await uploadMoviesData(filteredMovieData)

    mailClient.sendMail('Updated your movie list', JSON.stringify(movieData))
  } catch(error) {
    console.log(error)
    mailClient.sendMail('Failed to update film storage', error.toString())
  }
})
