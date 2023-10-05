import React from 'react'
import { Helmet } from 'react-helmet'

export default function NotFound() {

  <Helmet>
  <title>Not found</title>
  <meta name="Not found" />
</Helmet>

  return <>
  <div className="d-flex justify-content-center align-items-center">

      <img src={require('../../images/error.png')} alt="" />

  </div>
  </>
}
