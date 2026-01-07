import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css';
export function ChatMessage({message,sender}){
  /*
    const message=props.message;
    const sender=props.sender;
  */
  //const {message,sender}=props; even shorter by destructuring in parameter

  /*
  if (sender==='robot'){
    return (
      <div>
        <img src="Images/robot.png" width="50"/>
        {message}
      </div>
    );
  } else {
    return (
      <div>
        {message}
        <img src="Images/user.png" width="50"/>
      </div>
    );
  }
  */

  return (
    <div className={sender==='user'? 'chat-message-user':'chat-message-robot'}>
      {sender==='robot' && <img src={RobotProfileImage} className="chat-message-profile"/>}
      <div className="chat-message-text">
        {message}
      </div>
      {sender==='user' && <img src={UserProfileImage} className="chat-message-profile"/>}
    </div>
  );
}