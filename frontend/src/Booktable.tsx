import { book } from './types/books'; // Ensure this path is correct based on your file structure
import { useState, useEffect } from 'react';
import 'bootstrap';

function BooksList() {
  //Get the variable and make an incrementer
  const [books_data, setFoods] = useState<book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sort, setSort] = useState<number>(1);

  //Get the data from the API
  useEffect(() => {
    const fetchBowler = async () => {
      const response = await fetch(
        `https://localhost:7143/api/BookAPI?pageHowMany=${pageSize}&pageSize=${pageNum}&sort=${sort}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      setFoods(data.res);
      setTotalItems(data.totalRes);
      setTotalPages(Math.ceil(totalItems / pageSize));
      console.log(data);
    };
    fetchBowler();
  }, [pageSize, pageNum, sort]);
  console.log(books_data);

  return (
    <>
      <h1>Books</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Number of Pages</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books_data.map((element, index) => (
            <tr key={element.bookId}>
              <td>{element.title}</td>
              <td>{element.author}</td>
              <td>{element.publisher}</td>
              <td>{element.isbn}</td>
              <td>{element.category}</td>
              <td>{element.pageCount}</td>
              <td>{element.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      {[...Array(totalPages)].map((_, index) => (
        <button key={index + 1} onClick={() => setPageNum(index + 1)}>
          {index + 1}
        </button>
      ))}
      <br></br>
      <select value={sort} onChange={(s) => setSort(Number(s.target.value))}>
        <option value="1">Sorted</option>
        <option value="0">Unsorted</option>
      </select>

      <br></br>
      <label htmlFor="pages">Results per page </label>
      <select
        value={pageSize}
        onChange={(p) => setPageSize(Number(p.target.value))}
        id="pages"
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
    </>
  );
}

export default BooksList;
