import React, { useState, useEffect } from 'react'
import Header from '../global-component/Header'
import Footer from '../global-component/Footer'
import '../../styles/Library.css'
import { getBooks } from '../../services/UserService'
import { getUserDetails } from '../../services/AuthService'
import { requestBookPermission } from '../../services/UserService'

const Library = ({totalBooks}) => {
    useEffect(() => {
        getBooks().then(book => setBooks(book))
        getUserDetails().then(user => setUser(user))
    }, [])

    const [searchTerm, setSearchTerm] = useState('')

    const [user, setUser] = useState({
        id : '',
        userName : '',
        accountType : '',
        myBooks : []
    })

    const [books, setBooks] = useState({
        id : '',
        bookName : '',
        author : '',
        genre : '',
        publisher : '',
        yearOfRelease : '',
        bookFileUrl : '',
        bookImgUrl : ''
    })

    function handleSubmit(bookIsbn) {
        requestBookPermission(bookIsbn)
    }

    if(Array.isArray(books) && Object.keys(books).length !== 0) {
        totalBooks = Object.keys(books).length
    }

    return (
        <div style={{ fontFamily: "serif" }}>
            <Header name={user.userName} accountType={user.accountType}/>
            <div className="container mb-5">
                <div className="row mt-4 mx-lg-5 mx-2">
                    <div className="d-block text-center text-md-start col-md-6">
                        <p className="mb-0 library-links-active d-inline-block">Library</p>
                        <a href="/books" className="library-links d-inline-block mx-4">My Books</a>
                    </div>
                    <div className="col-md-6 text-md-end text-center mt-4 mt-md-0">
                        <input className="search-bar" placeholder="Search Book, Author, Genre, Year ....." onChange={e => {setSearchTerm(e.target.value)}}/>
                    </div>
                    <p className="mt-4 text-center text-md-start" style={{marginBottom: "-10px"}}>Total Number Of Books : {totalBooks}</p>
                    {// eslint-disable-next-line
                    Array.isArray(books) && books.filter((bk) => {
                        if(
                            bk.yearOfRelease.toString().includes(searchTerm) ||
                            bk.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            bk.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            bk.genre.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        return bk
                        }).map((bk) => {
                            return(
                                <div className="mt-5 col-lg-2 col-md-3 mx-md-3" key={bk.id}>
                                    <img alt={bk.id} className="d-block mx-auto" src={bk.bookImgUrl} style={{width: "150px"}}></img>
                                    <p className="text-center mt-3">{bk.genre} ({bk.yearOfRelease})</p>
                                    <button onClick={e => handleSubmit(bk.id)} className="btn btn-outline-primary border-2 rounded-3 mt-3 d-block mx-auto">Request</button>
                                </div>
                            )
                        })
                    }
                </div>                
            </div>
            <Footer name={user.userName}/>
        </div>
    )
}

Library.defaultProps = {
    totalBooks: 0
}

export default Library