import React, {useContext, useEffect, useState} from 'react';
import data from '../Tabledata.json';
import styles from './style.module.css';
import { Context } from '../Context';

const SortTable = () => {
    const { filteredData, setFilteredData, currentRows } = useContext(Context);
    const [direction, setDirection] = useState('ASC');
    const [collumn, setCollumn] = useState('title');
    const [operator, setOperator] = useState('include');
    const [searchTerm, setSearchTerm] = useState('');
    const sortThisProp = (prop) => {

        if (direction === 'ASC') { //Сортировка по возрастанию
            const compare = [...filteredData].sort((a, b) => 
            a[prop] > b[prop] ? 1 : - 1);
            setFilteredData(compare);
            setDirection('DESC'); 
        }

        if (direction === 'DESC') { //Сортировка по убыванию
            const compare = [...filteredData].sort((a, b) => 
            a[prop] < b[prop] ? 1 : - 1);
            setFilteredData(compare);
            setDirection('ASC');
        }
    }
    const setCol = (e) => {
        setCollumn(e.target.value);
    }
    const setOper = (e) => {
        setOperator(e.target.value);
    }

    const dataFilter = () => { //Фильтрация по значению в поисковой строке, взависимости от выбранного оператора и колонки
        setFilteredData(data.filter((val) => {

            switch (operator) { 

                case 'equals':
                    if(collumn === 'title') {
                        return (val[collumn].toLowerCase() === searchTerm.toLowerCase());
                    }
                    else {
                        return (val[collumn] == searchTerm);
                    }                     
                
                case 'include':                         
                    return (String(val[collumn]).toLowerCase()).includes(searchTerm.toLowerCase());

                case 'more' :
                    return (val[collumn] > (searchTerm));

                case 'less' :
                    return (Number(val[collumn] < (Number(searchTerm))));

                default :
                    return val; 
            }
        }))
    }

    useEffect(() => {
        setOperator('include');
    },[collumn]); //При смене колонки в выпадающем списке- изменение значения оператора на "содержит"

    useEffect(() => {
        dataFilter();
    },[searchTerm, operator, collumn]) //Рендер при изменении значений поисковой строки и выпадающих списков

    return (
        <div className={styles.container}>
            <header className={styles['container__header']}>
                <h1>Test from Welbex 🔍</h1>
                <div className={styles['container__header_filter']}>
                    <input className={styles['container__input']}
                        type='text' 
                        placeholder='Введите текст' 
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            console.log(searchTerm)
                        }}>
                    </input>
                    <select className={styles['container__select']} value={collumn} onChange={setCol}>
                        <option value='title'>Название</option>
                        <option value='qty'>Количество</option>
                        <option value='distance'>Дистанция</option>
                    </select>
                    <select className={styles['container__select']} value={operator} onChange={setOper}>
                        <option value='include'>Содержит</option> 
                        <option value='equals'>Равно</option>                        
                        {!(collumn === 'title')&&<option value='more'>Больше</option>}
                        {!(collumn === 'title')&&<option value='less'>Меньше</option>}
                    </select>
                </div>
            </header>
            <table className={styles['container__table']}>
                <thead>
                    <tr>                    
                        <th>Дата</th>
                        <th>Название
                            <span className={styles['container__span']} onClick={() => sortThisProp('title')}>↕</span>
                        </th>
                        <th>Количество
                            <span className={styles['container__span']} onClick={() => sortThisProp('qty')}>↕</span>
                        </th>
                        <th>Расстояние
                            <span className={styles['container__span']} onClick={() => sortThisProp('distance')}>↕</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row) => (
                        <tr key = {row.id}>
                            <td>{row.data}</td>
                            <td>{row.title}</td>
                            <td>{row.qty}</td>
                            <td>{row.distance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SortTable;