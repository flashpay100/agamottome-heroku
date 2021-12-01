import React, { useState, useEffect } from 'react'
import Header from '../global-component/Header'
import { downloadBook, getMyBooks } from '../../services/UserService'
import { getUserDetails } from '../../services/AuthService'

const Books = ({totalMyBooks}) => {
    useEffect(() => {
        getMyBooks().then(book => setMyBooks(book))
        getUserDetails().then(user => setUser(user))
    }, [])

    const [searchTerm, setSearchTerm] = useState('')

    const [user, setUser] = useState({
        id : '',
        userName : '',
        accountType : '',
        myBooks : []
    })

    const [myBooks, setMyBooks] = useState({
        myBooks :[{
            bookIsbn : '',
            bookName : '',
            dateOfCheckout : '',
            dateOfExpiry : '',
            bookImgUrl : '',
            permissionStatus : ''
        }]
    })

    function handleSubmit(bookIsbn) {
        downloadBook(bookIsbn)
    }

    if(Array.isArray(myBooks) && Object.keys(myBooks).length !== 0) {
        totalMyBooks = Object.keys(myBooks).length
    }

    return (
        <div style={{ fontFamily: "serif" }}>
            <Header name={user.userName} accountType={user.accountType}/>
            <div className="container mb-5">
                <div className="row mt-4 mx-lg-5 mx-2">
                    <div className="d-block text-center text-md-start col-md-6">
                        <a href="/library" className="library-links d-inline-block">Library</a>
                        <p className="library-links-active d-inline-block mx-4 mb-0">My Books</p>
                    </div>
                    <div className="col-md-6 text-md-end text-center mt-4 mt-md-0">
                        <input className="search-bar" placeholder="Search Book ....." onChange={e => {setSearchTerm(e.target.value)}}/>
                    </div>
                    <p className="mt-4 text-center text-md-start" style={{marginBottom: "-10px"}}>Total Number Of Books : {totalMyBooks}</p>
                    {// eslint-disable-next-line
                    Array.isArray(myBooks) && myBooks.filter((bk) => {
                        if(bk.bookName.toLowerCase().includes(searchTerm.toLowerCase()))
                        return bk
                        }).map((bk) => {
                            var expiryDate = bk.dateOfExpiry.substr(0, bk.dateOfExpiry.indexOf('T')).split('-').reverse().join('/')
                            var todayDate = new Date().toJSON().slice(0, 10).split('-').reverse().join('/')
                            var expiry = new Date(expiryDate.split('/')[2],expiryDate.split('/')[1]-1,expiryDate.split('/')[0])
                            var today = new Date(todayDate.split('/')[2],todayDate.split('/')[1]-1,todayDate.split('/')[0])
                            var timeDiff = Math.abs(expiry.getTime() - today.getTime());
                            var validity = Math.ceil(timeDiff / (1000*3600*24))
                            return(
                                <div className="mt-5 col-lg-2 col-md-3 mx-md-3" key={bk.bookIsbn}>
                                    <img alt={bk.id} className="d-block mx-auto" src={bk.bookImgUrl} style={{width: "150px"}}></img>
                                    <p className="text-center mt-3">Validity : {validity} Days</p>
                                    <button onClick={e => handleSubmit(bk.bookIsbn)} className="btn btn-outline-primary border-2 rounded-3 mt-3 d-block mx-auto">Download</button>
                                </div>
                            )
                        }).reverse()
                    }
                </div>                
            </div>
        </div>
    )
}

Books.defaultProps = {
    totalMyBooks: 0
}

export default Books