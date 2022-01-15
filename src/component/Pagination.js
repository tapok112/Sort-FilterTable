import React from 'react';
import styles from './style.module.css';

function Pagination(props) {

    const pageNumbers = [];

    for (let i = 1; i<= Math.ceil(props.totalRows / props.rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <ul className={styles['pagination__ul']}>
                {pageNumbers.map(number => (
                   <li key={number} className={styles['pagination__li']}>
                       <a className={styles['pagination__a']} onClick={() => props.changePage(number)}>
                           {number}
                        </a>
                   </li> 
                ))}
            </ul>
        </div>
    );
}

export default Pagination;