import AWS from 'aws-sdk'
import s3credentials from './../../credentials/S3Credentials.json'

const MOVIE_BUCKET_NAME = 'ryankrol-films'
const MOVIE_FILE_KEY = 'films.txt'

const downloadMoviesList = () => {
  AWS.config.update(s3credentials)

  const params = {
    Bucket: MOVIE_BUCKET_NAME,
    Key: MOVIE_FILE_KEY
  }

  return new Promise((resolve, reject) => {
    new AWS.S3().getObject(params, (error, data) => {
      if (error) reject(error)
      resolve(data.Body.toString())
    })
  })
}

export default downloadMoviesList
