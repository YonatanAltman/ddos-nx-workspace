import React, { useState, useRef, useEffect } from "react";
import { Globe2, Search, Loader2 } from "lucide-react";

// AG Grid imports
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule } from "ag-grid-community";

// Correct AG Grid CSS imports (no node_modules prefix)
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  // Ref to store the AG Grid API
  const gridApiRef = useRef(null);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
    setLoading(false);
  };

  // AG Grid column definitions
  const columnDefs = [
    {
      headerName: "Flag",
      field: "flag",
      cellRendererFramework: (params:any) => (
        <img
          src={params.data.flags.svg}
          alt={`${params.data.name.common} flag`}
          style={{
            width: 32,
            height: 24,
            objectFit: "cover",
            borderRadius: 4,
          }}
        />
      ),
      width: 100,
      suppressSizeToFit: true,
    },
    {
      headerName: "Name",
      field: "name",
      valueGetter: (params:any) => params.data.name.common,
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Capital",
      field: "capital",
      valueGetter: (params:any) =>
        params.data.capital ? params.data.capital[0] : "N/A",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Region",
      field: "region",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      headerName: "Population",
      field: "population",
      sortable: true,
      filter: true,
      flex: 1,
      valueFormatter: (params:any) =>
        params.value ? params.value.toLocaleString() : "",
    },
    {
      headerName: "Languages",
      field: "languages",
      valueGetter: (params:any) =>
        params.data.languages
          ? Object.values(params.data.languages).join(", ")
          : "N/A",
      sortable: true,
      filter: true,
      flex: 1,
    },
  ] as any;

  // Save AG Grid API when ready
  const onGridReady = (params:any) => {
    gridApiRef.current = params.api;
  };

  // Apply quick filter when search changes
  useEffect(() => {
    if (gridApiRef.current) {
      (gridApiRef.current as any).setQuickFilter(search);
    }
  }, [search]);

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Globe2 className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">World Countries</h1>
          </div>
          <button
            onClick={fetchCountries}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            {loading ? (
              <>
                <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              "Load Countries"
            )}
          </button>
        </div>

        {/* Search Input */}
        {countries.length > 0 && (
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search countries by name, region, capital, or languages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 border rounded p-2 w-full"
            />
          </div>
        )}

        {/* AG Grid Table */}
        {countries.length > 0 && (
          <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
            <AgGridReact
              modules={[ClientSideRowModelModule]}
              rowData={countries}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              pagination={true}
              paginationPageSize={20}
              defaultColDef={{
                resizable: true,
                filter: true,
                sortable: true,
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
