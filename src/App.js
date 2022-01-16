import SortTable from './component/SortTable';
import React, { useState } from 'react';
import Pagination from './component/Pagination';
import TableData from './Tabledata.json';
import { Context } from './Context'; 

function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [filteredData, setFilteredData] = useState(TableData);

  const lastRowIndex = currentPage * rowsPerPage; //Последний индекс элемента таблицы на странице (для пагинации)
  const firstRowIndex = lastRowIndex - rowsPerPage; //Первый индекс элемента таблицы на странице (для пагинации)
  const currentRows = filteredData.slice(firstRowIndex, lastRowIndex); //Массив с элементами на странице взависимости от номера страницы


  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    console.log(pageNumber)
  }  //Функция смены номера страницы

  return (
    <Context.Provider value = {{ filteredData, currentRows, setFilteredData }}>
        <SortTable />
        <Pagination rowsPerPage={rowsPerPage} totalRows={filteredData.length} changePage={changePage}/>
    </Context.Provider>
  )
}

export default App;
