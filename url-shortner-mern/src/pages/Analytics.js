import React, { useEffect } from 'react'
import { useGetAnalyticsQuery } from "../features/analyticsApiSlice"
import { selectAccessToken } from '../features/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

const Analytics = () => {
  const token = useSelector(selectAccessToken)
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) return navigate("/")
  }, [])

  const { data, isLoading, isSuccess } = useGetAnalyticsQuery();
  let content = (<></>)
  if (isLoading) {
    content = (<> <p>Loading...</p></>)
  }
  else if (isSuccess) {
    content = (
      <>
        <h2 className='text-center pad'>Dashboards</h2>

        <table>
          <colgroup>
            <col span="1" />
            <col span="1" className='secondCol' />
            <col span="1" />
            <col span="1" />
            <col span="1" />
          </colgroup>
          <tbody>
            <tr>
              <th>S.No</th>
              <th>Original Url</th>
              <th>Short Url</th>
              <th>Creation Date</th>
              <th>Analytics</th>
            </tr>
            {data.urls.map((url, i) => {
              return <tr key={url._id}>
                <td>{i + 1}</td>
                <td className='tdcustom'><Link className="link" to={url.redirectURL}>{url.redirectURL} </Link></td>
                <td><Link className='link' to={`http://localhost:8001/redirect/${url.shortId}`}>http://localhost:8001/redirect/{url.shortId} </Link></td>
                <td>{url.createdAt}</td>
                <td><button className='btn'>Click</button></td>
              </tr>
            })}
          </tbody>
        </table>

      </>
    )
  }
  else {
    content = (<> <p> failed to fetch </p> </>)
  }

  return (

    <div className='tableContainer'>
      {content}
    </div>
  )

}

export default Analytics