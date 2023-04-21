import Link from 'next/link'
import style from './nav.module.scss'
import {FC, useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import { Button } from '../ui/Button/Button'
import { useAppDispatch, useAppSelector } from '@/hooks/rtkHooks'
import { selectUser, setUser } from '@/slices/userSlice'
import { useGetCurrentUserMutation, useRefreshMutation } from '@/services/handleReqApiSlice'
import { setToken } from '@/slices/authSlice'

export const Nav:FC = () => {
  const dispatch = useAppDispatch();
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();
  const userFromSlice = useAppSelector(selectUser);
  const [refresh] = useRefreshMutation();
  const [getCurrentUser,{isLoading: userLoading}] = useGetCurrentUserMutation();
  const [user, setUserLocal] = useState(userFromSlice)

  useEffect(() => { setUserLocal(userFromSlice) }, [userFromSlice]);

  useEffect(() => {

    const handleRefresh = async () => {
      const refreshRes = await refresh();

      if ('error' in refreshRes) {
        setLoadingUser(false);
      }

      if ('data' in refreshRes) {        

        dispatch(setToken(refreshRes.data));

        const userRes = await getCurrentUser();
        if ('data' in userRes) {
          const { data: userData } = userRes;
          dispatch(setUser(userData));
          
        }        
        
        setLoadingUser(false);

      } else {
        if (router.pathname != '/') {
          router.push("/login");
        }

      }
    };

    handleRefresh();

  }, []);



  return (
    <nav className={style.nav}>
      <Link href='/'>
      <h1 >Good Deeds List</h1>
      </Link>     
      <div className={style['nav__button_container']}>
        {loadingUser?<span>Loading...</span>:
          user.name?<Link href='/user'>{user.name}</Link>: <Button size='default' color='primary' action={()=>router.push('/login')}>
          Login
        </Button>
        }
       </div>
    </nav>
  )
}
