import { useEffect, useState } from "react";
import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { userRequest } from '../../requestMethods'
import noavtor from '../../assets/no-avatar.png'
export default function WidgetSm() {

  const [user, setUser] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get('/user/?new=true')
        setUser(res.data.data)

      } catch (error) {

      }
    }
    getUsers()
  }, [])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {user.map((user)=>(
          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img || noavtor}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
       
      </ul>
    </div>
  );
}
