import { useAddDeedMutation, useAddFriendMutation, useDeleteRequestMutation, useGetRequestsMutation, useUpdateDeedMutation } from "@/services/handleReqApiSlice";
import Deed from "@/types/deed";
import ErrorResponse from "@/types/errorResponse";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {addDeed as addDeedToSlice} from '@/slices/deedSlice';
import style from './user.module.scss';
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { Button } from "@/components/ui/Button/Button";
import { removeRequest, selectRequests } from "@/slices/requestSlice";
import {setRequests as setRequestsSlice } from '@/slices/requestSlice'

interface FormValues {
  title: string;  
  description:string;
};

interface Props{
  setRequestsModalActive :Dispatch<SetStateAction<boolean>>
}

export const RequestsModal:FC<Props> = ({setRequestsModalActive})=>{
  const requestsFromSlice = useAppSelector(selectRequests);
  const [requests,setRequests] = useState(requestsFromSlice);
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | null>(null);
  const [getRequests] = useGetRequestsMutation();
  const [deleteRequest] = useDeleteRequestMutation();
  const [addFriend] = useAddFriendMutation();
  
  useEffect(() => { setRequests(requestsFromSlice) }, [requestsFromSlice]);

  useEffect(() => {

    const fetchRequests = async () => {
      const res = await getRequests();       
        if('data' in res){
          dispatch(setRequestsSlice(res.data));
          setRequests(res.data);
        }
      }

    
    fetchRequests();

  }, []);

  const handleAddFriend = async (recipientId:string,_id:string) =>{
    const res = await addFriend(recipientId);
    const deleteRes = await deleteRequest(_id)
    if('data' in deleteRes){
      dispatch(removeRequest(deleteRes.data));
    }
  }

  const handleDenyRequest = async (_id:string)=>{
    const deleteRes = await deleteRequest(_id)
    if('data' in deleteRes){
      dispatch(removeRequest(deleteRes.data));
    }
  }

  return(
    <div className={style.form}>     
    <div onClick={()=>{setRequestsModalActive(false)}} className={style['close']}>Close</div>
    <span className={style['form__header']}>Requests</span>
    <div className={style['requests']}>
      {
       requests.requests.length? requests.requests.map(request=>{
        return(
          <div className={style['request']}>
            <span>User:{request.senderName} wants to add as friend  </span>
            <Button action={()=>{handleAddFriend(request.senderId,request._id)}}>Add</Button>
            <Button action={()=>{handleDenyRequest(request._id)}} color="danger">Deny</Button>
          </div>
        )
      }):<span>You have no requests</span>
      }
    </div>

</div>
  )
}