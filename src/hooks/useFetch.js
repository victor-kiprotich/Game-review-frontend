import { useEffect, useState } from 'react'

const UseFetch = (url) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(url)
        const json = await res.json()
          //fetchData
        if (Array.isArray(json.data)) {
          setData(json.data)   // collection
        } else {
          setData(json.data)   // single item (object)
        }


        // Strapi always returns { data, meta }
        setData(json.data || [])
        setLoading(false)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { loading, error, data }
}

export default UseFetch
