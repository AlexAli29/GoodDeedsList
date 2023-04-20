import {FC} from 'react'
import style from './loginbutton.module.scss'



 interface buttonPros{
  size?: 'default' | 'medium' | 'large',
  children: React.ReactNode,
  color?: 'primary' | 'secondary' | 'danger' | 'neutral' | 'black',
  action?:()=>any,
  type?: "button" | "submit" | "reset" | undefined
}

export const Button:FC<buttonPros> = ({type,size,children,color,action}) => { 

  return (
    <button type={type} onClick={action} className={`${style.button} ${size=='medium'?style['button-medium']:size=='large'?style['button-large']:''} ${color=='secondary'?style['button-secondary']:color=='danger' ?style['button-danger']:color=='neutral'?style['button-neutral']:color=='black'?style['button-black']:''}`}>
        {children}
      </button>
  )
}