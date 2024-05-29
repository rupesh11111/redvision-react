import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminRoute = (props) => {
  const navigate = useNavigate()
  const { Component } = props


  useEffect(() => {
    let login = localStorage.getItem('token') || null
    let authUser = localStorage.getItem('user') || "{}"
    authUser = (authUser == undefined) ? "{}" : authUser;
    authUser = JSON.parse(authUser)
    if (!login) {
      navigate('/signin')
    }
    if(authUser.role != "admin") {
      navigate('/')
    }
  }, [])
  return (
    <>
      <Component />
    </>
  )
}

export default AdminRoute