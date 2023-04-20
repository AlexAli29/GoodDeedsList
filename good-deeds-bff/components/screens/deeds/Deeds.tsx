import { Button } from '@/components/ui/Button/Button'
import style from './deeds.module.scss'
import {FC, useEffect, useState} from 'react'
import { useAddDeedMutation, useGetDeedsMutation, useUpdateDeedMutation } from '@/services/handleReqApiSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/rtkHooks'
import { selectDeeds, setDeeds as setDeedsForSlice } from '@/slices/deedSlice'
import Deed, { DeedStatus } from '@/types/deed'
import { SubmitHandler, useForm } from 'react-hook-form'
import ErrorResponse from '@/types/errorResponse'
import { AddModal } from './AddModal'





export const Deeds:FC = () => { 
 
  const [modalActive, setModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const deedsFromSlice = useAppSelector(selectDeeds)
  const [deeds,setDeeds] = useState<Deed[]>(deedsFromSlice);

  const [getDeeds,{isLoading}] = useGetDeedsMutation()
  


  useEffect(() => { setDeeds(deedsFromSlice) }, [deedsFromSlice]);

  useEffect(()=>{

    const fetchDeeds = async () => {
      const response = await getDeeds();
      console.log(response)     
      if ('data' in response) {
       
        dispatch(setDeedsForSlice(response.data as Deed[]))
        setDeeds(response.data);
        }
    };

    fetchDeeds();
  },[])

      return (
        <div className={style.content}>
          <div className={style['addbtn']}>
            <Button action={()=>{setModalActive(true)}}>Add</Button>
          </div>
          <div className={`${style['modal']} ${modalActive?style['active']:null}`}>          
          <AddModal setModalActive={setModalActive}/>
          </div>
         {deeds.map(deed=>{
          return (            
            <div  key={deed._id} className={style['content__deed_item']} >
              <span>date:{deed.createdAt?.substring(0,deed.createdAt.indexOf('T'))}</span>
              <span>title:{deed.title}</span>
              <span className={style['description']}>Description:{deed.description}</span>
              <span>Status:{DeedStatus[deed.status ?? 0]}</span>
              <div className={style['buttons']}>
                <Button color='danger'>Delete</Button>
                <Button color='secondary'>Change</Button>
              </div>
            </div>            
          )
         })}
        </div>
      )
}
