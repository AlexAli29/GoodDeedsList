import Link from 'next/link'
import style from './user.module.scss'
import {FC, useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/hooks/rtkHooks'
import { removeFriendId, removeUser, selectFriendsIds, selectUser, setUser } from '@/slices/userSlice'
import { useAddRequestMutation, useDeleteFriendMutation, useGetCurrentUserMutation, useGetFriendsMutation, useLogOutMutation, useRefreshMutation } from '@/services/handleReqApiSlice'
import { logOut, setToken } from '@/slices/authSlice';
import { Button } from '@/components/ui/Button/Button';
import User from '@/types/user';
import { RequestsModal } from './RequestsModal';
import Friend from '@/types/friend';


export const User:FC = () => {
  const [requestsModalActive, setRequestsModalActive] = useState(false); 
  const dispatch = useAppDispatch(); 
  const friendsIdsFromSlice = useAppSelector(selectFriendsIds);
  const [friendsIds, setFriendsIds] = useState(friendsIdsFromSlice);
  const [addRequest] = useAddRequestMutation();
  const [requestName, setRequestName] = useState('');
  const router = useRouter();
  const userFromSlice = useAppSelector(selectUser);
  const [getFriends] = useGetFriendsMutation();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [user, setUserLocal] = useState<User | null>(userFromSlice);
  const [logout] = useLogOutMutation();
  const [deleteFriend] = useDeleteFriendMutation();

  const fetchFriends = async()=>{
    const res = await getFriends();
    if('data' in res){
      setFriends(res.data);
    }
  };

  useEffect(() => { setUserLocal(userFromSlice) }, [userFromSlice]);

  useEffect(() => { fetchFriends(); }, [friendsIdsFromSlice]);

const handleAddRequest = async()=>{
  
    await addRequest({recipientName:requestName});
    setRequestName('');
 
}

useEffect(()=>{
  fetchFriends();
},[])

const handelDeleteFriend = async (id:string) =>{
  
  
  const deleteFriendRes = await deleteFriend(id);
 
  if(!('error' in deleteFriendRes)){
    dispatch(removeFriendId(id));
  }
}

  const handleLogOut = async ()=>{
    dispatch(logOut());
    dispatch(removeUser());
    await logout();
    router.push('/');
  }

  return (
   <div className={style['content']}>
     <div className={`${style['modal']} ${requestsModalActive?style['active']:null}`}>          
          <RequestsModal setRequestsModalActive={setRequestsModalActive} setFriends={setFriends}/>
          
          </div>
    <div className={style['to-deeds']}></div>
    <div className={style['user']}>
      <p>Name:{user?.name}</p>
      <p>Email:{user?.email}</p>
      
      <div className={style['user-controls']}>
      <Link href='/deeds'><Button>Deeds</Button></Link>
      <Button action={handleLogOut} color='danger'>Log out</Button>
      <Button action={()=>{setRequestsModalActive(true)}} color='black'>Requests</Button>
        </div>   
    <div className={style['add-friend-container']}>
      <input value={requestName} className={style['request_input']} onChange={(e)=>setRequestName(e.target.value)} placeholder='user name' type="text" />
      <Button action={handleAddRequest}>Send Requests</Button>
    </div>
    </div>
    <h3>Friends:</h3>
    <div className={style['friends']}>      
      {
        friends.map((friend)=>{
          return(
            
             <div key={friend._id} className={style['friend']}>
              <Link href={`user/${friend._id}`}>
              <span className={style['friend_name']}>User name: {friend.name}</span>
              </Link>
              <button onClick={(e)=>{handelDeleteFriend(friend._id)}} className={style['delete_friend']}>Delete</button>
            </div>
            
          )
        })
      }
    </div>
   </div>
  )
}
