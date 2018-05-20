import React from "react"


class Pagination extends React.Component {
    render() {
        return (
            <ul className="pagination" style={{listStyle: 'none'}}>
                <li className="page">1</li>
            </ul>
        );
    }
}

export default Pagination