import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useState } from 'react'
import { Add, Cancel, Delete, List, Save, Search } from "@mui/icons-material"
import axios from '../../api/axios'
import { Link } from 'react-router-dom'
const UserHome = () => {
  const [userID, setUserID] = useState('')
  const [lName, setLName] = useState('')
  const [fName, setFName] = useState('')
  const [users, setUsers] = useState([])
  
  const handleSearch = async () => {
    try {
      debugger
      if (!userID) {
        alert("Enter User ID")
        return
      }
      const userAPI = await axios.get(`user/find/${userID}`)
      if (userAPI.status === 200) {
        clearFields()
        const json = await userAPI.data

        setUserID(json.user_id)
        setFName(json.f_name)
        setLName(json.l_name)
      }
      if (userAPI.status === 204) {
        alert("No record found")
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleShowAll = async () => {
    try {
      debugger
      const userAPI = await axios.get(`user/all`)
      if (userAPI.status === 200) {
        const json = await userAPI.data
        console.log(json)
        setUsers(json)
      }
      if (userAPI.status === 400) {
        alert("No record found")
      }
    } catch (error) {
      alert(error)
    }
  }

  const handleDelete = async () => {
    try {
      if (!userID) {
        alert("Enter User ID")
        return
      }
      const userAPI = await axios.delete(`user/delete/${userID}`)
      if (userAPI.status === 200) {
        clearFields()
        alert("Record deleted.")
      }
      if (userAPI.status === 204) {
        alert("No record found")
      }
    } catch (error) {
      alert(error)
    }
  }

  const clearFields = () => {
    setUserID("")
    setLName("")
    setFName("")
    setUsers([])
  }

  return (
    <div className='flex flex-col bg-white w-screen h-screen items-center justify-center'>
      <div className='flex flex-col gap-5'>
        <TextField
          fullWidth
          value={userID}
          label={"User ID"}
          onChange={(e) => { setUserID(e.target.value) }}
        />
        <div className='flex flex-row gap-2'>
          <TextField
            fullWidth
            value={fName}
            label={"First name"}

          />
          <TextField
            fullWidth
            value={lName}
            label={"Last Name"}
          />
        </div>
        <div className='grid grid-flow-col gap-2 '>
          <Link to="/create">
            <Button
              size='small'
              variant='contained'
              startIcon={<Add />}
            >
              Add
            </Button>
          </Link>

          <Button
            size='small'
            variant='contained'
            startIcon={<Search />}
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            size='small'
            variant='contained'
            color='success'
            startIcon={<List />}
            onClick={handleShowAll}
          >
            Show all
          </Button>
          <Button
            size='small'
            variant='contained'
            color='error'
            startIcon={<Delete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
          <Button
            size='small'
            variant='contained'
            color='error'
            startIcon={<Cancel />}
            onClick={clearFields}
          >
            Clear
          </Button>
        </div>
      </div>
      {
        users.length > 0 ?
          <div className='h-[300px] mt-5'>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">User ID</TableCell>
                    <TableCell align="center">First Name</TableCell>
                    <TableCell align="center">Last Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(val => {
                    return (
                      <TableRow TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{val.user_id}</TableCell>
                        <TableCell align="center">{val.f_name}</TableCell>
                        <TableCell align="center">{val.l_name}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div> : <></>
      }

    </div >

  )
}

export default UserHome