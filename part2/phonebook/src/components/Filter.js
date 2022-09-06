const Filter = ({filterName, handleFilterNameChange, filteredNames}) => {
    return(
        <div>
        filter shown with <input value={filterName} onChange={handleFilterNameChange} />
        {filteredNames.map( filter => (
          <li key={filter.id}>{filter.name} {filter.number}</li>
        ))}
      </div>
    )
}

export default Filter