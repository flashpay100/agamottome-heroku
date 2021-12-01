import React, { useState, useEffect } from 'react'
import Header from '../global-component/Header'
import '../../styles/Library.css'
import '../../styles/Dashboard.css'
import { getUserDetails } from '../../services/AuthService'
import { getBookAccess, revokeBook, deleteBook, revokeMultipleBooks, addBook } from '../../services/AdminService'

const Dashboard = ({totalAccess}) => {
    useEffect(() => {
        getBookAccess().then(access => setAccessRecords(access))
        getUserDetails().then(user => setUser(user))
    }, [])

    const [accessRecords, setAccessRecords] = useState({
        emailAddress : '',
        userName : '',
        bookIsbn : '',
        bookName : '',
        validity : ''
    })

    const [user, setUser] = useState({
        id : '',
        userName : '',
        accountType : '',
        myBooks : []
    })

    const [visibleBooks, setVisibleBooks] = useState(10);
    function handleShowMoreBooks(e) {
        e.preventDefault()
        setVisibleBooks(previousVisibleBooks => previousVisibleBooks + 5)
    }

    if(Array.isArray(accessRecords) && Object.keys(accessRecords).length !== 0) {
        totalAccess = Object.keys(accessRecords).length
    }

    function handleSubmit(emailAddress, bookIsbn) {
        revokeBook(emailAddress, bookIsbn)
    }

    function handleDeleteBook() {
        var bookIsbn = prompt("Enter The Isbn Of Book To Be Deleted")
        if(bookIsbn !== null) {
            var confirmDelete = window.confirm("Book :- " + bookIsbn + " Will Be Deleted Permanently. Are You Sure You Want To Delete Book?")
            if(confirmDelete === true) {
                deleteBook(bookIsbn)
            }   
        }     
    }

    function openDialog() {
        document.getElementById("revokeFile").click()
    }

    function handleFileUpload(e) {
        e.preventDefault()
        revokeMultipleBooks(e.target.files[0])       
    }

    const [data, setData] = useState({
        bookIsbn : '',
        bookName : '',
        author : '',
        genre : '',
        publisher: '',
        yearOfRelease: '',
        bookFile: '',
        bookImage: ''
    })

    function handleChange(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    function handleFileChange(e) {
        const newData = {...data}
        if(e.target.id === "bookFile") {
            newData["bookFile"] = e.target.files[0]
            setData(newData)
        }
        if(e.target.id === "bookImage") {
            newData["bookImage"] = e.target.files[0]
            setData(newData)
        }
    }

    function handleBookSubmit(e) {
        e.preventDefault()
        addBook(data.bookIsbn, data.bookName, data.author, data.genre, data.publisher, data.yearOfRelease, data.bookFile, data.bookImage)
    }

    return (
        <div style={{ fontFamily: "serif" }}>
            <Header name={user.userName} accountType={user.accountType}/>
            <div className="container pb-5">
                <div className="d-block text-start col-md-6 mt-4 mx-lg-5 mx-2">
                    <p className="library-links-active d-inline-block mb-0">Dashboard</p>
                    <a href="/revokedlist" className="library-links d-inline-block mx-4">Revoked List</a>
                </div>
                <div className="row mt-2 px-lg-5">
                    <div className="col-md-8">
                        <button data-bs-toggle="modal" data-bs-target="#newBookModal" className="btn btn-outline-primary border-2 mt-4 px-4 py-2 d-inline-block me-3"><b>Add Book</b></button>
                        <button onClick={(e) => handleDeleteBook(e)} className="btn btn-outline-primary border-2 mt-4 px-4 py-2 d-inline-block"><b>Delete Book</b></button>
                    </div>
                    <div className="col-md-4 text-md-end text-start">
                        <input id="revokeFile" onChange={(e) => handleFileUpload(e)} type="file" accept=".csv" hidden />
                        <button onClick={(e) => openDialog(e)} className="btn btn-outline-primary border-2 mt-4 d-inline-block px-4 py-2 me-lg-4"><b>Multiple Revoke</b></button>
                    </div>
                    <div className="modal fade" id="newBookModal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content bg-white border-4 border-primary mx-3">
                                <div className="modal-header border-4 border-primary">
                                    <h5 className="modal-title text-dark"><b>Add New Book</b></h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" />
                                </div>
                                <form onSubmit={(e) => handleBookSubmit(e)} autoComplete="off">
                                    <div className="modal-body text-dark">
                                        <input id="bookIsbn" type="text" onChange={(e) => handleChange(e)} className="book-field" placeholder="Book Isbn" required />
                                        <input id="bookName" type="text" onChange={(e) => handleChange(e)} className="book-field" placeholder="Book Name" required />
                                        <input id="author" type="text" onChange={(e) => handleChange(e)} className="book-field" placeholder="Author" required />
                                        <input id="genre" type="text" onChange={(e) => handleChange(e)} className="book-field" placeholder="Genre" required />
                                        <input id="publisher" type="text" onChange={(e) => handleChange(e)} className="book-field" placeholder="Publisher" required />
                                        <input id="yearOfRelease" type="number" onChange={(e) => handleChange(e)} className="book-field" placeholder="Release Year" required />
                                        <label className="d-block mt-3">Book File</label>
                                        <input onChange={(e) => handleFileChange(e)} className="mt-1" id="bookFile" type="file" accept=".pdf" />
                                        <label className="d-block mt-3">Book Image</label>
                                        <input onChange={(e) => handleFileChange(e)} className="mt-1" id="bookImage" type="file" accept=".png" />
                                    </div>
                                    <div className="modal-footer border-4 border-primary mt-3">
                                        <button onSubmit={(e) => handleSubmit(e)} type="submit" className="btn btn-outline-success border-2" data-bs-dismiss="modal"><b>Submit</b></button>
                                        <button className="btn btn-outline-danger border-2" data-bs-dismiss="modal"><b>Close</b></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="mt-4 mb-2 mx-lg-5 mx-2 text-start" style={{marginBottom: "-10px"}}>Total Number Of User Book Access : {totalAccess}</p>
                <div className="container text-dark mt-4 px-lg-5">
                    <table>
                        <tbody>
                            <tr style={{fontSize: "18px"}}>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>S.No</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Email</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>User</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Isbn</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Book</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Validity</th>
                                <th className="border-2 border-dark px-3 py-2" style={{ textDecoration: "underline", textDecorationThickness: "2px", textUnderlineOffset: "5px" }}>Revoke</th>
                            </tr>
                            {// eslint-disable-next-line
                                Array.isArray(accessRecords) && accessRecords.reverse().map((bk, i) => {
                                    return(
                                        <tr key={i+1}>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{i+1}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.emailAddress}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.userName}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.bookIsbn}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.bookName}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><b>{bk.validity}</b></td>
                                            <td className="border-2 border-dark px-3 py-2 text-danger"><button onClick={e => handleSubmit(bk.emailAddress, bk.bookIsbn)} className="btn btn-outline-danger border-2"><b>Revoke</b></button></td>
                                        </tr>        
                                    )
                                }).slice(0, visibleBooks)
                            }
                        </tbody>
                    </table>
                    <button onClick={(e) => handleShowMoreBooks(e)} className="btn btn-outline-dark border-2 mt-4 d-block px-4 py-2"><b>Show More</b></button>
                </div>    
            </div>
        </div>
    )
}

Dashboard.defaultProps = {
    totalAccess: 0
}

export default Dashboard