import Link from 'next/link'
import style from './nav.module.scss'
import {FC, useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/rtkHooks'
import { selectUser, setUser } from '@/slices/userSlice'
import { useGetCurrentUserMutation, useRefreshMutation } from '@/services/handleReqApiSlice'
import { setToken } from '@/slices/authSlice';


export const User:FC = () => {
  const dispatch = useAppDispatch();
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();
  const userFromSlice = useAppSelector(selectUser);
  const [refresh] = useRefreshMutation();
  const [getCurrentUser,{isLoading: userLoading}] = useGetCurrentUserMutation();
  const [user, setUserLocal] = useState(userFromSlice)




  return (
   <div>ii</div>
  )
}
