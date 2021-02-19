
import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import UserTable from "../Tables/UserTable";

function Users() {
  const [state, setstate] = useState([]);
  const [cols, setcols] = useState([
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' }
  ])
  const history = useHistory();

  const dispatch = useDispatch()
  const [msg, setmsg] = useState('')

  const handleDelete = (id) => {
    console.log(id)
    axios.delete('http://localhost:4000/api/users/' + id)
      .then((res) => {

        console.log(res.data);

        // console.log(res.data);

        setmsg(`${id} is deleted successfully`);
        history.push('/users')

      })
      .catch((e) => console.log(e));


  }
  useEffect(() => {
    async function fetchUsers() {
      const users = await axios.get('http://localhost:4000/api/users')
      console.log(users.data.data);
      setstate(users.data.data)

    }
    fetchUsers()
  }, []);

  return (
       <UserTable  rows={state} cols={cols}/>
  );
}
export default Users;