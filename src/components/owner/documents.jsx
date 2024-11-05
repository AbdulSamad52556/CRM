import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';

const BASE_URL = 'http://localhost:8000'

const Documents = () => {
    const [ownerid, setOwnerid] = useState(0)
    const [documents, setDocuments] = useState([]);
    const [error, setError] = useState(null);
    const { user, logout } = useContext(AuthContext)

    useEffect(()=>{
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/crm/agreement-documents/owner/${user.id}/`);
                setDocuments(response.data);
                console.log(response.data)
            } catch (err) {
                console.log(err)
                setError(err);
            }
        };

        fetchDocuments();   
        setOwnerid(user)

    },[])

    const handleViewDocument = async(id) =>{
        const response = await axios.post(`${BASE_URL}/api/crm/agreement-documents/owner/signed/${id}/`)
        console.log(response.data)
    }
   
  return (
    <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Owner Name</TableCell>
                        <TableCell>Document Type</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>agreement</TableCell>
                        <TableCell>Actions</TableCell>  
                    </TableRow>
                </TableHead>
                <TableBody>
                    {documents.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.owner.owner_name}</TableCell>
                            <TableCell>{doc.document_type}</TableCell>
                            <TableCell>{new Date(doc.created_at).toLocaleString()}</TableCell>
                            <TableCell>{doc.status}</TableCell>
                            <TableCell>
                                <pre style={{ whiteSpace: 'pre-wrap' }}>{doc.document_content}</pre>
                            </TableCell>
                            <TableCell>
                                {doc.is_verified_from_legal_team === true && doc.status === 'Signed'?doc.document_contect:
                                <button className='bg-[#10002B] p-4 rounded text-white' onClick={() => handleViewDocument(doc.id)}>make sign</button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
  )
}

export default Documents
