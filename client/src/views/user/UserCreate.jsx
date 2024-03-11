import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { Cancel, Clear, Save } from "@mui/icons-material"
import { Link } from 'react-router-dom'
import axios from '../../api/axios'

const UserCreate = () => {
  const [userID, setUserID] = useState('')
  const [password, setPassword] = useState('')
  const [lName, setLName] = useState('')
  const [fName, setFName] = useState('')


  const handleAdd = async () => {
    try {
      debugger
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
        alert(emptyFields.map(data => data))
      }

      const doc = {
        userID,
        password,
        fName,
        lName
      }
      const userAPI = await axios.post(`user/add`, JSON.stringify(doc))

      console.log("🚀 ~ handleAdd ~ userAPI:", userAPI)
      if (userAPI.status === 200) {
        clearFields()
        alert("Success!")
      }

      if (userAPI.status === 400) {
        const json = await userAPI.data[0]
        alert(json)
      }
      return
    } catch (error) {
      alert(error)
    }
  }

  const clearFields = () => {
    setUserID("")
    setLName("")
    setFName("")
    setPassword('')
  }
  return (
    <div className='flex bg-white w-screen h-screen items-center justify-center'>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-row gap-2'>
          <TextField
            fullWidth
            value={fName}
            label={"First name"}
            onChange={(e) => {
              setFName(e.target.value)
            }}
          />
          <TextField
            fullWidth
            value={lName}
            label={"Last Name"}
            onChange={(e) => {
              setLName(e.target.value)
            }}
          />
        </div>
        <TextField
          fullWidth
          value={userID}
          label={"User ID"}
          onChange={(e) => {
            setUserID(e.target.value)
          }}
        />
        <TextField
          value={password}
          label={"Password"}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />


        <div className='grid grid-flow-col gap-2 '>
          <Button
            size='small'
            variant='contained'
            onClick={handleAdd}
          >
            Create
          </Button>

          <Button
            size='small'
            variant='outlined'
            color='error'
            onClick={clearFields}
          >
            Clear
          </Button>

          <Link to="/">
            <Button
              fullWidth
              size='small'
              variant='contained'
              color='error'
            >
              Cancel
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default UserCreate