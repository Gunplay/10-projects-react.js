import React, { useEffect, useState } from 'react'
import Collection from './Collection'
import './index.scss'

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
]

function App() {
  const [categoryId, setCategortId] = useState(0) // All category - 0
  const [seacrhValue, setSearchValue] = useState('')
  console.log(seacrhValue)
  const [collections, setCollections] = useState([])
  console.log(collections)
  useEffect(() => {
    fetch('https://63d4d4c50e7ae91a00a2fb57.mockapi.io/api/p1/collection')
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.warn(err)
        alert('Error from got date')
      })
  }, [])

  return (
    <div className="App">
      <h1 style={{ color: 'black' }}>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {/* <li className="active">Все</li> */}
          {cats.map((obj, i) => (
            <li
              onClick={() => setCategortId(i)}
              className={categoryId === i ? 'active' : ''}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={seacrhValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {collections
          .filter((obj) => {
            if (obj.name.toLowerCase().includes(seacrhValue.toLowerCase())) {
              return obj.name
            }
          })
          .map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          ))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  )
}

export default App
