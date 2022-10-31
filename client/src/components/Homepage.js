import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

const Homepage = () => {
    const [users, setUsers] = useState(null);
    const testArray = []

    for(let i=0; i<10; i++){
        testArray.push(i)
    }


    useEffect(() => {
        fetch("/api/allRecipients")
        .then((res) => res.json())
        .then((data) => {
            setUsers(data.data);
        })
        .catch((err)=>console.log(err))
    }, []);

    



    return(
        users? 
        <>
        <div>Yes</div>
        </>
        :<div>No</div>
    )
}

export default Homepage;