import axios from "axios";      //server hit/ to hit api of backend (api call)
import { useEffect, useState } from "react";        //to render the component/page/data
import SERVER_URL from "../ServerURL"
import { PiInfoFill } from "react-icons/pi";
import { BiSolidMessageRoundedEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import { MdAddCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import Spinner from "../components/Spinner";

//Home is a component
const Home = () => {
  const [books, setBooks] = useState([]);   //can store array objects
  const [loading, setLoading] = useState(false);  //to show loading of pages
  const fetchBook = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(`${SERVER_URL}/book`);
      console.log(resp.data);
      setBooks(resp.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBook();
  }, []);           //dependency array-> activate only once
  return (            // use return for html content
    <>
     <h2 className="text-3xl bg-sky-700 text-white p-4">Book Store</h2>

      <div className="p-4">
      <Link to="/books/create">
      <MdAddCircle className="text-4xl text-blue-800"/>
      </Link>
        <div className="flex justify-between items-center">
        
        {loading ? (
          <Spinner/>
        ) : (
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-500 rounded-md">Sno</th>
                <th className="border border-slate-500 rounded-md">Title</th>
                <th className="border border-slate-500 rounded-md">Author</th>
                <th className="border border-slate-500 rounded-md">Year</th>
                <th className="border border-slate-500 rounded-md">Options</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => {
                return (
                  <tr key={book._id}>
                    <td className="border border-slate-500 rounded-md text-center">{index + 1}</td>
                    <td className="border border-slate-500 rounded-md text-center">{book.title}</td>
                    <td className="border border-slate-500 rounded-md text-center">{book.author}</td>
                    <td className="border border-slate-500 rounded-md text-center">{book.year}</td>
                    <td className="border border-slate-500 rounded-md text-center flex justify-center">
                      <Link to={`/books/${book._id}`}><PiInfoFill className="text-2xl text-white-400"/></Link>
                    <Link to={`/books/edit/${book._id}`}><BiSolidMessageRoundedEdit className="text-2xl text-green-400" /></Link>
                    <Link to={`/books/delete/${book._id}`}><RiDeleteBinFill className="text-2xl text-red-600" /></Link></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </>
  );
};
export default Home;
