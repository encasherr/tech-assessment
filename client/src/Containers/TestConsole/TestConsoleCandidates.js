import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles(theme => ({
//     root: {
//       width: '100%',
//       marginTop: theme.spacing(3),
//       overflowX: 'auto',
//     },
//     table: {
//       minWidth: 700,
//     },
// }));

class TestConsoleCandidates extends Component {

    render = () => {
        // const classes = useStyles();
        let { currentTest } = this.props;
        return (
            <div>
            {/* {currentTest &&
            <Typography variant="subtitle1">No Invitations Sent</Typography> 
             } */}
            {currentTest && currentTest.invitations && currentTest.invitations.length > 0 && 
            <Card>
                <CardContent>
                <Table>
                    <TableHead>
                    <TableRow>
                        <CustomTableCell>Email</CustomTableCell>
                        <CustomTableCell align="left">Status</CustomTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {currentTest.invitations.map((inviteInfo, index) => (
                        <TableRow key={index}>
                        <CustomTableCell align="left"><Typography variant="subtitle2" >{inviteInfo.emailTo}</Typography></CustomTableCell>
                        <CustomTableCell align="left"><Typography variant="subtitle2" >{inviteInfo.status}</Typography></CustomTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>}
            </div>
        );

        // return (
        //     <Paper className={classes.root}>
        //         <Table className={classes.table}>
        //             <TableHead>
        //             <TableRow>
        //                 <StyledTableCell>Email</StyledTableCell>
        //                 <StyledTableCell align="right">Status</StyledTableCell>
        //             </TableRow>
        //             </TableHead>
        //             <TableBody>
        //             {currentTest.invitations.map(row => (
        //                 <StyledTableRow key={row.emailTo}>
        //                 <StyledTableCell component="th" scope="row">
        //                     {row.status}
        //                 </StyledTableCell>
        //                 </StyledTableRow>
        //             ))}
        //             </TableBody>
        //         </Table>
        //     </Paper>
        // )
    }
}
const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#3f51b5',
      //   backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
}))(TableRow);
export default TestConsoleCandidates;