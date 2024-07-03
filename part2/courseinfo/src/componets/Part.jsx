const Part = (props) => {
    const { parts } = props
    console.log('parts', parts);
    return (
        <>
            {parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>)}
        </>
    )
}

export default Part