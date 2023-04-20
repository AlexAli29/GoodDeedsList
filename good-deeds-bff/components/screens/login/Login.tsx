import { Button } from '@/components/ui/Button/Button'
import style from './login.module.scss'
import {FC, FormEvent, useState} from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useGetCurrentUserMutation, useLoginMutation } from '@/services/handleReqApiSlice'
import ErrorResponse from '@/types/errorResponse'
import { useAppDispatch } from '@/hooks/rtkHooks'
import { setToken } from '@/slices/authSlice'
import { setUser } from '@/slices/userSlice'
import { useRouter } from 'next/router'


interface FormValues {
  name: string;  
  password:string;
};


export const Login:FC = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login,{isLoading}] = useLoginMutation()
  const { register, handleSubmit, reset,formState: { errors } } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | null>(null);
  const [getCurrentUser,{isLoading: userLoading}] = useGetCurrentUserMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await login(data);      
      setErrorMessage(null);
      if ('data' in response) {
       
        dispatch(setToken(response.data));
       
        const userRes = await getCurrentUser();
        if ('data' in userRes) {
          const { data: userData } = userRes;
          dispatch(setUser(userData));
          reset();
          router.push('/deeds');
        }
      }
      if ('error' in response) {
        const { error } = response;
        setErrorMessage(error as ErrorResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
      <span className={style['form__header']}>Login</span>
      <span className={style['form__register_link']}>Don't have an account? <Link href='register'>register</Link></span>
      <div className={style['form__fields_container']}>
      <div className={style['form__input_container']}>
           <input {...register('name', {
            required: "Name is required field"
          })} placeholder='name' className={style['form__input']}/>
          {errors?.name && (
            <div className={style['form__field_error']}>{errors.name.message}</div>
          )}
           </div>
           
           <div className={style['form__input_container']}>
           <input {...register('password', {
            required: "Password is required field",
            
          })} placeholder='password' type='password' className={style['form__input']}/>
          {errors?.password && (
            <div className={style['form__field_error']}>{errors.password.message}</div>
          )}
           </div>
      </div>
      <div className={style['form__error']}>
            <span>{errorMessage?.data?.message}</span>
          </div>
      <Button type='submit' color='primary' size='medium' >Login</Button>
      </form>
  )
}
