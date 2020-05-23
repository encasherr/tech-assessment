import React from 'react';
import { Typography, List } from '@material-ui/core';
import McqItem from './McqItem';

class SelectedMcqs extends React.Component {

    sortMcqs = (mcqs) => {
        return mcqs.sort((a, b) => b.questionOrderIndex - a.questionOrderIndex);
    }

    render = () => {
        let { selectedMcqs } = this.props;
        let orderedSelectedMcqs = [];
        if(selectedMcqs){
            orderedSelectedMcqs = this.sortMcqs(selectedMcqs);
        }
        return (
            <div>
            {orderedSelectedMcqs && orderedSelectedMcqs.length > 0 &&
                <List>
                    {orderedSelectedMcqs.map((item, index) => {
                        return (
                            <McqItem mcqItem={item}  key={index}
                                        onSelect={ () => this.props.openMcq(item) }
                                        onRemoveMcqFromTest={ () => this.props.onRemoveMcqFromTest(item) }
                                        isDeletable={true}
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
}
export default SelectedMcqs;