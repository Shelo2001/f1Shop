import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { detailsUser } from '../../features/users/usersSlice'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const userDetails = useSelector((state) => state.users.userDetails)

  useEffect(() => {
    dispatch(detailsUser(params.id))
  }, [dispatch])

  return <div>{userDetails.name}</div>
}

export default ProfilePage
