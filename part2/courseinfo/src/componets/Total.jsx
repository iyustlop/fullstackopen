const Total = (props) => {
    const { parts } = props
    console.log('total', parts);
    const total = parts.reduce((sum, part) => {
        console.log('prueba', sum, part);
        return sum + part.exercises
    }, 0)
    return (
        <>
            <h2>total of {total} exercises</h2>
        </>
    )
}

export default Total