import { Button } from '@/components/ui/Button/Button'
import style from './register.module.scss'
import {FC, useState} from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler, set } from "react-hook-form";
import { useAppDispatch, useAppSelector } from '@/hooks/rtkHooks';
import { useRegisterMutation, useGetCurrentUserMutation } from '@/services/handleReqApiSlice';
import { selectToken, setToken } from '@/slices/authSlice';
import ErrorResponse from '@/types/errorResponse';
import { setUser } from '@/slices/userSlice';
import Auth from '@/types/auth';
import { useRouter } from 'next/router';

interface FormValues {
  name: string;  
  email: string;
  password:string;
};




export const Register:FC = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [registerUser, { isLoading}] = useRegisterMutation();
  const [getCurrentUser,{isLoading: userLoading}] = useGetCurrentUserMutation();  
  const { register, handleSubmit, reset,formState: { errors } } = useForm<FormValues>();
  const [errorMessage, setErrorMessage] = useState<ErrorResponse | null>(null);
  

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await registerUser(data);      
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
      else {
        const { error } = response;
        setErrorMessage(error as ErrorResponse);
      }
    } catch (error) {
      console.log(error);
    }
  }
    
      return (
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <span className={style['form__header']}>Register</span>
          <span className={style['form__login_link']}>Already have an account? <Link href='login'>login</Link></span>
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
           <input {...register('email', {
            required: "Email is required field",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Enter valid email'
            }
          })} placeholder='email' className={style['form__input']}/>
          {errors?.email && (
            <div className={style['form__field_error']}>{errors.email.message}</div>
          )}
           </div>
            
           <div className={style['form__input_container']}>
           <input {...register('password', {
            required: "Password is required field",
            minLength: {
              value: 8,
              message: 'Password must contain at least 8 symbols' // JS only: <p>error message</p> TS only support string
            },
          })} placeholder='password' type='password' className={style['form__input']}/>
          {errors?.password && (
            <div className={style['form__field_error']}>{errors.password.message}</div>
          )}
           </div>
          </div>
          <div className={style['form__error']}>
            <span>{errorMessage?.data?.message}</span>
          </div>
          <Button type='submit' color='primary' size='medium' >Register</Button>
          </form>
      )
}
