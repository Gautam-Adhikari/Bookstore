import axios from "axios";      //server hit/ to hit api of backend (api call)
import { useEffect, useState } from "react";        //to render the component/page/data

//Home is a component
const Home = () => {
  const [books, setBooks] = useState([]);   //can store array objects
  const [loading, setLoading] = useState(false);  //to show loading of pages
  const fetchBook = async () => {
    try {
      setLoading(true);
      const resp = await axios.get("http://localhost:3000/book");
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
  }, []);
  return (
    <>
      <div className="">
        <div className="">
          <h2>Book Store</h2>
        </div>
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => {
                return (
                  <tr key={book._id}>
                    <td>{index + 1}</td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.year}</td>
                    <td>todo</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default Home;
