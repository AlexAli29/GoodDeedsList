import { Button } from '@/components/ui/Button/Button'
import style from './deeds.module.scss'
import {FC, useEffect, useState} from 'react'
import { useGetFriendDeedsMutation } from '@/services/handleReqApiSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/rtkHooks'
import { removeDeed, selectDeeds, setDeeds as setDeedsForSlice } from '@/slices/deedSlice'
import Deed, { DeedStatus } from '@/types/deed';
import { useRouter } from 'next/router'


interface Props {
  userId : string
}

interface FriendsDeedsPageQuery {
  page?: string;
  sort_by?: string;
  sort_order?: string;
  userId?: string;
}

export const FriendsDeeds:FC = () => { 
  const router = useRouter();
  const {userId} = router.query as FriendsDeedsPageQuery
 const [getFriendDeeds] = useGetFriendDeedsMutation()
  const dispatch = useAppDispatch();  
  const [deeds,setDeeds] = useState<Deed[]>();
  

  useEffect(()=>{

    const fetchDeeds = async () => {
      const response = await getFriendDeeds(userId ?? '');
      console.log(response)     
      if ('data' in response) {       
        setDeeds(response.data as Deed[])     
        }
    };

    fetchDeeds();
  },[])

      return (
        <div className={style.content}>          
          
         {deeds?.map(deed=>{
          return (            
            <div  key={deed._id} className={style['content__deed_item']} >
              <span>date:{deed.createdAt?.substring(0,deed.createdAt.indexOf('T'))}</span>
              <span>title:{deed.title}</span>
              <span className={style['description']}>Description:{deed.description}</span>
              <span>Status:{DeedStatus[deed.status ?? 0]}</span>              
            </div>            
          )
         })}
        </div>
      )
}
