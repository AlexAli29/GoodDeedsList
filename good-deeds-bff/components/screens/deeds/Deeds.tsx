import { Button } from '@/components/ui/Button/Button'
import style from './deeds.module.scss'
import {FC, useEffect, useState} from 'react'
import { useAddDeedMutation, useDeleteDeedMutation, useGetDeedsMutation, useUpdateDeedMutation } from '@/services/handleReqApiSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/rtkHooks'
import { removeDeed, selectDeeds, setDeeds as setDeedsForSlice } from '@/slices/deedSlice'
import Deed, { DeedStatus } from '@/types/deed';
import { AddModal } from './AddModal'
import { UpdateModal } from './UpdateModal'





export const Deeds:FC = () => { 
 
  const [modalActive, setModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const dispatch = useAppDispatch();
  const deedsFromSlice = useAppSelector(selectDeeds)
  const [deeds,setDeeds] = useState<Deed[]>(deedsFromSlice);
  const [deedToUpdate, setDeedToUpdate] = useState({_id:'',title:'',description:''});
  const [getDeeds,{isLoading}] = useGetDeedsMutation();
  const [deleteDeed] = useDeleteDeedMutation();
  
const handleDelete  = async (id:string)=>{
  const response = await deleteDeed(id);
  if('data' in response){
    dispatch(removeDeed(response.data))
  }
}

  useEffect(() => { setDeeds(deedsFromSlice) }, [deedsFromSlice]);

  useEffect(()=>{

    const fetchDeeds = async () => {
      const response = await getDeeds();
      console.log(response)     
      if ('data' in response) {       
        dispatch(setDeedsForSlice(response.data as Deed[]));        
        }
    };

    fetchDeeds();
  },[])

      return (
        <div className={style.content}>
          <div className={style['addbtn']}>
            <Button action={()=>{setModalActive(true); setUpdateModalActive(false)}}>Add</Button>
          </div>
          <div className={`${style['modal']} ${modalActive?style['active']:null}`}>          
          <AddModal setModalActive={setModalActive}/>
          
          </div>
          <div className={`${style['modal-update']} ${updateModalActive?style['active']:null}`}>          
          <UpdateModal title={deedToUpdate.title} description={deedToUpdate.description} id={deedToUpdate._id}  setUpdateModalActive={setUpdateModalActive}/>
          </div>
         {deeds.map(deed=>{
          return (            
            <div  key={deed._id} className={style['content__deed_item']} >
              <span>date:{deed.createdAt?.substring(0,deed.createdAt.indexOf('T'))}</span>
              <span>title:{deed.title}</span>
              <span className={style['description']}>Description:{deed.description}</span>
              <span>Status:{DeedStatus[deed.status ?? 0]}</span>
              <div className={style['buttons']}>
                <Button color='danger' action={()=>{handleDelete(deed._id ?? '')}}>Delete</Button>
                <Button color='secondary' action={()=>{setUpdateModalActive(true); setModalActive(false); setDeedToUpdate({_id:deed._id ?? '',title:deed.title ??'',description:deed.description ?? ''})}}>Change</Button>
              </div>
            </div>            
          )
         })}
        </div>
      )
}
