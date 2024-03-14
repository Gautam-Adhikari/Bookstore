import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {
  const [books,setBooks] = useState();
  const [loading,setLoading] = useState(false);
  const fetchBook = async ()=>{
    try {
        setLoading(true);
        const resp = await axios.get("http://localhost:3000/book");
        console.log(resp.data);
        setBooks(resp.data.data);
        setLoading(false);
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
  };
  useEffect(() => {
    fetchBook();
  }, []); 

  return <div>Home</div>
};

export default Home