const Filter = ({ handleFilterName }) => {
    console.log('filter', handleFilterName);
    return (
        <div>
            filter shown with <input onChange={handleFilterName} />
        </div>)
}

export default Filter