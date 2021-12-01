import React from 'react'

const Footer = ({ name }) => {
    var displayType = "none"
    if(name === "Leo Varghese" || name === "Subhasish Mohapatra") {
        displayType = "block"
    }
    return (
        <div className="bg-white pt-4 pb-2" style={{ fontSize: "16px", fontFamily: "serif" }}>
            <p className="text-dark text-center">Copyright &copy; Anush Raghavender {new Date().getFullYear()}</p>
            <p className="text-dark text-center" style={{ display: displayType }}>&#10084; MIG Rocks &#10084;</p>
        </div>
    )
}

Footer.defaultProps = {
    name : " "
}

export default Footer