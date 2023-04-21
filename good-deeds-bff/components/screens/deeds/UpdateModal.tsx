import { useAddDeedMutation, useUpdateDeedMutation } from "@/services/handleReqApiSlice";
import Deed from "@/types/deed";
import ErrorResponse from "@/types/errorResponse";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {addDeed as addDeedToSlice} from '@/slices/deedSlice';
import style from './deeds.module.scss';
import { useAppDispatch } from "@/hooks/rtkHooks";
import { Button } from "@/components/ui/Button/Button";
import { updateDeed as updateDeedSlice } from "@/slices/deedSlice";

interface FormValues {
  title: string;  
  description:string;
  id:string;
};

interface Props extends FormValues{
  setUpdateModalActive :Dispatch<SetStateAction<boolean>>
  
}

export const UpdateModal:FC<Props> = ({setUpdateModalActive, title,description, id})=>{
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | null>(null); 
  const [updateDeed,{isLoading:isUpdating}]= useUpdateDeedMutation();
  const { register, handleSubmit, reset,formState: { errors } } = useForm<FormValues>({
    
  });
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      
      const addedDeedRes = await updateDeed({_id:id,...data});
      if('data' in addedDeedRes ){
        setErrorMessage(null)
        
        dispatch(updateDeedSlice(addedDeedRes.data as Deed));

        setUpdateModalActive(false);
        reset()
      }
      else{
        setErrorMessage(addedDeedRes.error as ErrorResponse);
      }
      
    } catch (error) {
      console.log(error);
    }
  }



  return(
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>     
    <div onClick={()=>{setUpdateModalActive(false), reset()}} className={style['close']}>Close</div>
    <span className={style['form__header']}>Update deed</span>
<div className={style['form__fields_container']}>
<div className={style['form__input_container']}>
     <input {...register('title', {
      required: "Title is required field"
    })} placeholder='title' defaultValue={title} className={style['form__input']}/>
    {errors?.title && (
      <div className={style['form__field_error']}>{errors.title.message}</div>
    )}
     </div>
     
     <div className={style['form__input_container']}>
     <textarea  {...register('description', {
      required: "Description is required field",
      
    })} placeholder='description' defaultValue={description} className={`${style['form__area']}`}/>
    {errors?.description && (
      <div style={{top:'12.4rem'}} className={style['form__field_error']}>{errors.description.message}</div>
    )}
     </div>
</div>
<div className={style['form__error']}>
      <span>{errorMessage?.data?.message}</span>
    </div>
<div className={style['btn']}> <Button type='submit' color='primary' size='medium' >Add</Button></div>
</form>
  )
}