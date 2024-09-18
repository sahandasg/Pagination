import React, {useEffect, useState} from 'react';
import useFetch from "../hooks/useFetch";

//bootstrap components
import Pagination from "react-bootstrap/Pagination";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import data from "bootstrap/js/src/dom/data";

function Todos(props) {
    const {data, loading, error} = useFetch("GET", 'todos/')
    const [show, setShow] = useState(true);
    const [page, setPage] = useState(1);
    const [displayData , setDisplayData] = useState("");

    let todoPerPage = 20;
    let paginationNumber = null
    let lastIndex = todoPerPage * page
    let firstIndex = lastIndex - todoPerPage

    if (!loading) {
        paginationNumber = Array.from(Array(Math.ceil(data.length / todoPerPage)).keys());
    }

    const pageHandler = (pageNumber) => {
        setPage(pageNumber);
    }

    useEffect(()=>{
       if (!loading) setDisplayData(data.slice(firstIndex, lastIndex))
    },[page, loading])

    return (
        <div className="w-75 d-flex flex-column justify-content-center align-items-center mt-5">
            {
                loading && <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            }
            {
                error && show && <Alert className="w-50" variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>Error:</Alert.Heading>
                    <p>
                        {error.message}
                    </p>
                </Alert>
            }

            <pre>{JSON.stringify(displayData, null, 2)}</pre>
            <Pagination>
                {
                    paginationNumber && paginationNumber.map(item => (
                        <Pagination.Item
                            key={item}
                            onClick={() => pageHandler(item + 1)}>{item + 1}
                        </Pagination.Item>
                    ))
                }
            </Pagination>
        </div>

    );
}

export default Todos;