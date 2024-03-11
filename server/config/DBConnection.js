import mysql from 'mysql2'
import DBPool from './DBPool.js'

const DBConnection = {
  connectDB: () => {
    try {
      const pool = mysql.createPool(DBPool.dbConfig).promise()
      return pool
    } catch (error) {
      console.log(error)
    }
  }
}

export default DBConnection