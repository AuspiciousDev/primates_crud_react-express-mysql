
import DBConnection from '../config/DBConnection.js'

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const query = await DBConnection
        .connectDB()
        .query("SELECT * FROM tblUser INNER JOIN tblUserDetails ON tblUser.user_id = tblUserDetails.user_id")

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
      if (!req.params.user_id) {
        return res.status(400).json({ message: "User ID is required!" })
      }
      const user_id = req.params.user_id

      const query = await DBConnection
        .connectDB()
        .query(`SELECT * FROM tblUser INNER JOIN tblUserDetails ON tblUser.user_id = tblUserDetails.user_id WHERE tblUser.user_id = '${user_id}'`)

      let dataset = query[0].map(data => { return { ...data } })
      if (dataset.length < 1) {
        return res.status(204).json()
      }
      return res.status(200).json(dataset[0])
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log({ message: error.message })
    }
  },

  addUser: async (req, res) => {
    try {
      const { user_id, password, f_name, l_name } = req.body
      let emptyFields = []

      if (!user_id) {
        emptyFields.push("user_id")
      }
      if (!password) {
        emptyFields.push("password")
      }
      if (!f_name) {
        emptyFields.push("f_name")
      }
      if (!l_name) {
        emptyFields.push("l_name")
      }

      if (emptyFields.length > 0) {
        return res.status(400).json({ emptyFields })
      }

      const checkIfExists = await DBConnection
        .connectDB()
        .query(`SELECT * FROM tblUser WHERE user_id = '${user_id}'`)

      let dataset = checkIfExists[0].map(data => { return { ...data } })
      if (dataset.length > 0) {
        return res.status(400).json({ message: "User already exists!" })
      }

      const query = await DBConnection
        .connectDB()
        .query(`INSERT INTO tblUser VALUES('${user_id}', '${password}', '${f_name}', '${l_name}')`)

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
      const { user_id, password } = req.body

      if (!user_id) {
        return res.status(400).json({ message: "User ID is required!" })
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required!" })
      }

      const checkIfExists = await DBConnection
        .connectDB()
        .query(`SELECT * FROM tblUser WHERE user_id = '${user_id}'`)

      let dataset = checkIfExists[0].map(data => { return { ...data } })
      if (dataset.length < 1) {
        return res.status(400).json({ message: "User does not exists!" })
      }

      const query = await DBConnection
        .connectDB()
        .query(`UPDATE tblUser SET password = '${password}' WHERE user_id = '${user_id}'`)

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
      if (!req.params.user_id) {
        return res.status(400).json({ message: "User ID is required!" })
      }
      const user_id = req.params.user_id

      const checkIfExists = await DBConnection
        .connectDB()
        .query(`SELECT * FROM tblUser WHERE user_id = '${user_id}'`)

      let dataset = checkIfExists[0].map(data => { return { ...data } })
      if (dataset.length < 1) {
        return res.status(400).json({ message: "User does not exists!" })
      }

      const query = await DBConnection
        .connectDB()
        .query(`DELETE FROM tblUser WHERE user_id = '${user_id}'`)

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