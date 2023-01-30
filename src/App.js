import React, { useEffect, useState } from 'react'
import Collection from './Collection'
import './index.scss'

const cats = [
  { name: 'All' },
  { name: 'Sea' },
  { name: 'Mountains' },
  { name: 'Architecture' },
  { name: 'Cities' },
]

function App() {
  const [categoryId, setCategortId] = useState(0) // All category - 0
  const [seacrhValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [collections, setCollections] = useState([])
  console.log(collections)

  useEffect(() => {
    setIsLoading(true) //What would work when switching
    const URL = `https://63d4d4c50e7ae91a00a2fb57.mockapi.io/api/p1/collection?`
    const category = categoryId ? `category=${categoryId}` : ``
    // const page = page && `page=${page}&limit=3&`
    // const page = `page=${categoryId}&limit=3&`

    fetch(`${URL}`)
      // created sort by category!)
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.warn(err)
        alert('Error from got date')
      })
      .finally(() => setIsLoading(false))
    // created sort by category!
  }, [categoryId, page]) // dependence

  return (
    <div className="App">
      <h1 style={{ color: 'black' }}>My photo collection</h1>
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
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections
            .filter((obj) =>
              obj.name.toLowerCase().includes(seacrhValue.toLowerCase())
            )
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(4)].map((_, i) => (
          <li
            key={i}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
