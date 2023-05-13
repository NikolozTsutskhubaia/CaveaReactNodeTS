import { useState, useEffect, useMemo } from "react";
import axios, { AxiosResponse } from "axios";
import classes from "./Modules/App.module.css";
import ClickableImage from "./Components/ClickableImage";
import NavComponent from "./Components/NavComponent";

function App() {
  interface Item {
    id: number;
    name: string;
    location: string;
    price: number;
    [key: string]: any;
  }

  interface ResponseData {
    data: Item[];
    totalCount: number;
  }

  interface Sort {
    key: string;
    direction: string;
  }

  const [data, setData] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [refreshPage, setRefreshPage] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("ყველა");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortConfig, setSortConfig] = useState<Sort>({
    key: " ",
    direction: " ",
  });

  const handleSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== " ") {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(event.target.value);
    console.log(location);
  };

  const refreshHandler = () => {
    setRefreshPage(!refreshPage);
  };

  const nextPage = () => {
    setCurrentPage((prevValue) => prevValue + 1);
    console.log(currentPage);
  };

  const previousPage = () => {
    setCurrentPage((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
    console.log(currentPage);
  };

  useEffect(() => {
    axios
      .get<ResponseData>(
        `http://localhost:8000/inventories?page=${currentPage}&location=${location}`
      )
      .then((response: AxiosResponse<ResponseData>) => {
        setData(response.data.data);
        setTotalCount(response.data.totalCount);
      })
      .catch((error) => console.error(error));
  }, [currentPage, location, refreshPage]);

  return (
    <div className={classes.container}>
      <NavComponent changeHandler={changeHandler} />
      <div>
        <table className="table table-dark table-striped w-400 mt-3 ">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>ID</th>
              <th onClick={() => handleSort("name")}>სახელი</th>
              <th onClick={() => handleSort("location")}>ლოკაცია</th>
              <th onClick={() => handleSort("price")}>ფასი</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.location}</th>
                <th>{item.price}₾</th>
                <th>
                  <ClickableImage
                    imageUrl="../trash-can.png"
                    onClick={() => {
                      console.log(item.id);
                      axios
                        .delete(`http://localhost:8000/inventories/${item.id}`)
                        .then((response) => {
                          console.log(response.data);
                          refreshHandler();
                        })
                        .catch((error) => {
                          console.error(
                            "There was a problem with the Axios request:",
                            error
                          );
                        });
                    }}
                  />
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex flex-row">
          <button type="button" className="btn btn-dark" onClick={previousPage}>
            უკან
          </button>
          <div className="bg-dark p-2 ms-2 me-2 rounded text-white">
            {currentPage}
          </div>
          <button type="button" className="btn btn-dark" onClick={nextPage}>
            შემდეგი
          </button>
          <div className="bg-dark p-2 ms-2 me-2 rounded text-white">
            ნივთების რაოდენობა : {totalCount}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
