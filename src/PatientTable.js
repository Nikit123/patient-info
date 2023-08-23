import './PatientTable.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import get from 'lodash/get';

const PatientTable = ({ loading, error, data }) => {
    const getName = (row) => {
        const nameObject = get(row, 'resource.name', [])
        var name = "";
        if (nameObject.length > 0) {
            const givenArr = get(nameObject[0], 'given', [])
            if (givenArr.length > 0) {
                name += givenArr[0];
            }
            name += " " + get(nameObject[0], 'family', "");
        }
        return name
    }

    const getContact = (row) => {
        var phone = ""
        var telecomArray = get(row, 'resource.telecom', [])
        if (telecomArray.length > 0) {
            var phones = telecomArray.filter((obj) => obj.system === "phone")
            if (phones.length > 0)
                phone = get(phones[0], 'value', "")
        }
        return phone
    }

    const getAddress = (row) => {
        var addressText = ""
        var addressArray = get(row, 'resource.address', [])
        if (addressArray.length > 0) {
            addressText = get(addressArray[0], 'text', "")
        }
        return addressText
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className='table-container'>
            {data && data.length > 0 ? (
                <><TableContainer component={Paper} className='table-data-container'>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontFamily: 'serif', fontSize: '18px', fontWeight: 'bold' }} align="center" colSpan={6}>
                                    Patient Details Table
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Gender</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Birth Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Address</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="left">Phone</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{get(row, 'resource.id', "")}</TableCell>
                                    <TableCell align="left">{getName(row)}</TableCell>
                                    <TableCell align="left">{get(row, 'resource.gender', "")}</TableCell>
                                    <TableCell align="left">{get(row, 'resource.birthDate', "")}</TableCell>
                                    <TableCell align="left">{getAddress(row)}</TableCell>
                                    <TableCell align="left">{getContact(row)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                    <Box className='table-footer'>
                        Entries: {data.length}
                    </Box>
                </>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    )
};

export default PatientTable;
