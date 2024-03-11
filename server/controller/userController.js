
import DBConnection from '../config/DBConnection.js'

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const query = await DBConnection
        .connectDB()
        .query("SELECT * FROM tblUser")

      let dataset = query[0].map(data => { return { ...data } })
      if (dataset.length < 1) {
        return res.status(204).json()
      }
      return res.status(200).json(dataset)
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log({ message: error.message })
    }
  },

  getUser: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "User ID is required!" })
      }
      const userID = req.params.id

      const query = await DBConnection
        .connectDB()
        .query(`SELECT * FROM tblUser WHERE userID = '${userID}'`)

      let dataset = query[0].map(data => { return { ...data } })
      if (dataset.length < 1) {
        return res.status(204).json()
      }
      return res.status(200).json(dataset)
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log({ message: error.message })
    }
  },

  addUser: async (req, res) => {
    try {
      const { userID, password, fName, lName } = req.body
      let emptyFields = []

      if (!userID) {
        emptyFields.push("userID")
      }
      if (!password) {
        emptyFields.push("password")
      }
      if (!fName) {
        emptyFields.push("fName")
      }
      if (!lName) {
        emptyFields.push("lName")
      }

      if (emptyFields.length > 0) {
        return res.status(400).json({ emptyFields })
      }

      const checkIfExists = await DBConnection
        .connectDB()
        .query(`SELECT * FROM tblUser WHERE userID = '${userID}'`)

      let dataset = checkIfExists[0].map(data => { return { ...data } })
      if (dataset.length > 0) {
        return res.status(400).json({ message: "User already exists!" })
      }

      const query = await DBConnection
        .connectDB()
        .query(`INSERT INTO tblUser VALUES('${userID}', '${password}', '${fName}', '${lName}')`)

      if (query[0].serverStatus === 2) {
        return res.status(200).json({ message: "Success" })
      }
      else {
        return res.status(500)
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log({ message: error.message })
    }
  },

  changePassword: async (req, res) => {
    try {
      const { userID, password } = req.body

      if (!userID) {
        return res.status(400).json({ message: "User ID is required!" })
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required!" })
      }

      const checkIfExists = await DBConnection
        .connectDB()
        .query(`SELECT * FROM tblUser WHERE userID = '${userID}'`)

      let dataset = checkIfExists[0].map(data => { return { ...data } })
      if (dataset.length < 1) {
        return res.status(400).json({ message: "User does not exists!" })
      }

      const query = await DBConnection
        .connectDB()
        .query(`UPDATE tblUser SET password = '${password}' WHERE userID = '${userID}'`)

      if (query[0].serverStatus === 2) {
        return res.status(200).json({ message: "Success" })
      } else {
        return res.status(500)
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log({ message: error.message })
    }
  },

  deleteUser: async (req, res) => {
    try {
      if (!req.params.id) {
        return res.status(400).json({ message: "User ID is required!" })
      }
      const userID = req.params.id

      const checkIfExists = await DBConnection
        .connectDB()
        .query(`SELECT * FROM tblUser WHERE userID = '${userID}'`)

      let dataset = checkIfExists[0].map(data => { return { ...data } })
      if (dataset.length < 1) {
        return res.status(400).json({ message: "User does not exists!" })
      }

      const query = await DBConnection
        .connectDB()
        .query(`DELETE FROM tblUser WHERE userID = '${userID}'`)

      if (query[0].serverStatus === 2) {
        return res.status(200).json({ message: "Success" })
      }
      else {
        return res.status(500)
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log({ message: error.message })
    }
  }
}

export default userController 