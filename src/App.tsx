import { useEffect, useRef, useState } from 'react';
import { useGetData } from './api/dataApi';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { OverlayPanel } from 'primereact/overlaypanel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const [selectedArticles, setSelectedArticles] = useState<any[]>([]);
  const { results, isLoading, pagination } = useGetData(page);
  const overlayPanelRef = useRef<any>(null);

  useEffect(() => {
    const storedInputValue = localStorage.getItem('inputValue');
    if (storedInputValue) {
      setInputValue(storedInputValue);
    }
  }, []);

  const onPageChange = (e: any) => {
    setPage(e.page + 1);
  };

  const onSelectionChange = (e: any) => {
    setSelectedArticles(e.value);
  };

  const handleIconClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    overlayPanelRef.current?.toggle(event);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    localStorage.setItem('inputValue', newValue);
  };


  useEffect(() => {
    const numberOfRows = parseInt(inputValue, 10);
    if (numberOfRows > (page) * (pagination?.limit || 12)) {
      if (!isNaN(numberOfRows) && numberOfRows > 0) {
        setSelectedArticles(results.slice(0, numberOfRows));
      }
    }
    else if(numberOfRows<(page) * (pagination?.limit || 12) && numberOfRows > (page-1) * (pagination?.limit || 12)){
      if (!isNaN(numberOfRows) && numberOfRows > 0) {
        setSelectedArticles(results.slice(0, (numberOfRows)%12));
      }
    }
  }, [results])


  const handleSubmit = () => {
    const numberOfRows = parseInt(inputValue, 10);
    if (numberOfRows > (page) * (pagination?.limit || 12)) {
      if (!isNaN(numberOfRows) && numberOfRows > 0) {
        setSelectedArticles(results.slice(0, numberOfRows));
      }
    }
    else if(numberOfRows+(12*(page-1))<(page) * (pagination?.limit || 12) && numberOfRows+(12*(page-1)) > (page-1) * (pagination?.limit || 12)){
      if (!isNaN(numberOfRows) && numberOfRows > 0) {
        setSelectedArticles(results.slice(0,(numberOfRows)%12));
      }
    }
    overlayPanelRef.current?.hide();

  };



  if (isLoading) return <div>Loading...</div>;

  return (
    <>

      <DataTable
        value={results}
        paginator
        rows={pagination?.limit || 10}
        totalRecords={pagination?.total || 0}
        lazy
        first={(page - 1) * (pagination?.limit || 10)}
        onPage={onPageChange}
        selection={selectedArticles}
        onSelectionChange={onSelectionChange}
        dataKey="id"
        selectionMode="multiple"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>

        <Column
          field="title"
          header={
            <span onClick={handleIconClick}>
              <i className="pi pi-chevron-down" style={{ marginRight: '8px', cursor: 'pointer' }}></i>
              Title
            </span>
          }
        ></Column>
        <Column field="place_of_origin" header="Place Of Origin"></Column>
        <Column field="artist_display" header="Artist Display"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>
      <OverlayPanel ref={overlayPanelRef}>
        <div style={{ padding: '5px', width: '150px', borderRadius: "15px" }}>
          <input
            type="text"
            placeholder="Enter value"
            style={{ width: '100%', marginBottom: '10px' }}
            value={inputValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            style={{ width: '100%', height: "25px", borderRadius: "15px" }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </OverlayPanel>
    </>
  );
}

export default App;