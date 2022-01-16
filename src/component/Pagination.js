import React from 'react';
import styles from './style.module.css';

function Pagination(props) { //Использовал пропсы для демонстрации, что умею и так)

    const pageNumbers = []; //Массив с номерами страниц

    for (let i = 1; i<= Math.ceil(props.totalRows / props.rowsPerPage); i++) {
        pageNumbers.push(i);
    } //Цикл для вставки номеров страниц в массив

    return (
        <div>
            <ul className={styles['pagination__ul']}>
                {pageNumbers.map(number => (
                   <li key={number} className={styles['pagination__li']}>
                       <a className={styles['pagination__a']} onClick={() => props.changePage(number)}>{/* Меняет состояние currentPage*/}
                           {number}
                        </a> 
                   </li> 
                ))}
            </ul>
        </div>
    );
}

export default Pagination;