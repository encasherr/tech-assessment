import React from 'react';
import { Typography, List } from '@material-ui/core';
import McqItem from './McqItem';

const SelectedMcqs = (props) => {
    let { selectedMcqs } = props;
    
    console.log('SelectedMcqs render');
    console.log(selectedMcqs);
    return (
        <div>
        {selectedMcqs && selectedMcqs.length > 0 &&
            <List>
                {selectedMcqs.map((item, index) => {
                    return (
                        <McqItem mcq={item}  key={index}
                                    onSelect={ () => props.openMcq(item) }
                                    isSelectable={false} />
                    );
                })}
            </List>
        }
        {!selectedMcqs && 
            <Typography variant="subtitle1">No questions selected</Typography>
        }
        {selectedMcqs && selectedMcqs.length === 0 && 
            <Typography variant="subtitle1">No questions selected</Typography>
        }
        </div>
    )
}
export default SelectedMcqs;