const ShowElement = ({ isVisible, children }) => {
    if(isVisible)
        return(children)
    else return(null)
}

export default ShowElement