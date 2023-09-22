import React, { useEffect } from 'react'
import { useState } from 'react'
import { useGenerateShortUrlMutation } from '../features/urlApiSlice';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../features/authSlice';

const Home = () => {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [shortUrl, setShortUrl] = useState(null);
  const [url, setOriginalUrl] = useState("");
  const [generateShortUrl, { isLoading }] = useGenerateShortUrlMutation();
  const req = null;
  const token = useSelector(selectAccessToken)
  async function generate() {

    if (token) {
      setUserLoggedIn(true)
      try {
        const shortU = await generateShortUrl({ url }).unwrap();
        setShortUrl(shortU.shortUrl)
        console.log(shortU.shortUrl)

      } catch (error) {
        console.log(error)
      }
    }
    else {
      setUserLoggedIn(false)
    }
  }
  useEffect(() => {
    setUserLoggedIn(true)
  }, [url])

  return (
    <div className='Container flex'>
      <div className={userLoggedIn ? "hide" : "error border"} >
        <p  >Login is required</p>
      </div>
      <div className="flex urlDiv  flex-center">
        <div className='flex flex-row flex center'>
          <form >
            <input className='linkInput' type="text" placeholder="Put your link here" value={url} onChange={(e) => setOriginalUrl(e.target.value)} name="" id="" />
          </form>
          <button className='btn generate-btn' onClick={generate}>Generate</button>
        </div>
        {(shortUrl !== null) ? <div>Your short url: {shortUrl}</div> : ""}
      </div>
    </div>


  )
}

export default Home