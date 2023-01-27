import React, { useEffect, useState } from 'react'
import './index.scss'
import { Success } from './components/Success'
import { Users } from './components/Users'

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([])
  const [invites, setInvites] = useState([])
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchValue, setSeatchValue] = useState('')

  console.log(users)
  console.log(searchValue)
  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data)
      })
      .catch((err) => {
        console.warn(err)
        alert('Error')
      })
      .finally(() => setIsLoading(false))
  }, [])

  const onChangeSearchValue = (e) => {
    setSeatchValue(e.target.value)
  }

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id)) // delete user
    } else {
      setInvites((prev) => [...prev, id]) // add user
    }
  }

  const onClickSendInvites = () => {
    setSuccess(true)
  }
  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          items={users}
          isLoading={isLoading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  )
}

export default App
