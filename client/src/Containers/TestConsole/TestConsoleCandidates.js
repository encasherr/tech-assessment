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

import InviteList from '../InviteConsole/InviteList';
import OpPublishTest from '../../OnlinePortal/Tests/OpPublishTest';

class TestConsoleCandidates extends Component {

    render = () => {
        let { candidates } = this.props;
        return (
          <>
            <OpPublishTest {...this.props} />
            <InviteList
                {...this.props}
                invitations={candidates}
                />
          </>
        )


        return (
            <div>
                <Typography variant="subtitle1">No Invitations Sent</Typography> 
            </div> 
        )

    }
}
const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: '#3f51b5',
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