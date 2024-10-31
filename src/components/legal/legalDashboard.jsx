// LegalDashboard.js

import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'

const LegalDashboard = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleVerify = async (id) => {
        try {
            const response = await axios.patch(`${BASE_URL}/api/crm/agreement-documents/verify/${id}/`);
            console.log(response.data);
        } catch (error) {
            console.error('Error verifying document:', error.response.data.detail);
        }
    };

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/crm/agreement-documents`); 
                console.log(response.data)
                setDocuments(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching documents: {error.message}</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Owner Name</TableCell>
                        <TableCell>Document Type</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>views</TableCell>
                        <TableCell>status</TableCell>
                        <TableCell>Verification</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {documents.map((doc) => (
                        <TableRow key={doc.id}>
                            <TableCell>{doc.owner.owner_name}</TableCell>
                            <TableCell>{doc.document_type}</TableCell>
                            <TableCell>{new Date(doc.created_at).toLocaleString()}</TableCell>
                            <TableCell>
                            <pre style={{ whiteSpace: 'pre-wrap' }}>{doc.document_content}</pre>
                                {/* <button onClick={() => handleViewDocument(doc.id)}>View</button> */}
                            </TableCell>
                            <TableCell>{doc.status}</TableCell>
                            <TableCell>
                                {doc.is_verified_from_legal_team === false && doc.status === 'pending'?
                                <button className='bg-[#10002B] p-2 text-white rounded'onClick={() => handleVerify(doc.id)} >
                                    send the agreement
                                </button>: doc.status === 'pending' && doc.is_verified_from_legal_team === true ?
                                <button className='bg-[#ff9b2a] p-2 text-black rounded'onClick={() => handleVerify(doc.id)} >
                                    Waiting for owner's signature
                                </button>:
                                <button className='bg-[#24b11f] p-2 text-white rounded'onClick={() => handleVerify(doc.id)} >
                                owner signed
                            </button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <div className='fixed'>
            </div> */}
        </TableContainer>
    );
};


export default LegalDashboard;
