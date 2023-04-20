import { Button } from '@/components/ui/Button/Button'
import style from './home.module.scss'
import {FC} from 'react'
import { useRouter } from 'next/router';

export const Home:FC = () => {

  const router = useRouter();

  return (
    <div className={style.home}>
      <div className={style['home__content_container']}>
        <h2>Welcome to Good Deeds List</h2>
        <div className={style['home__login-button_container']}>
          <Button type='button' color='primary' size='medium' action={()=>router.push('/login')}>
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}
