import React from 'react'

// Define a default UI for filtering
export default function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return (
    <input
      style={{width: "8rem"}}
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`...`}
    />
  )
}
