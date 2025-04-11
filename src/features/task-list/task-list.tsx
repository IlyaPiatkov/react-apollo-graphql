import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import type {List as ListType} from '@shared/typedef';


type Props = {
    data: Array<ListType>;
    onDelete: (id: string) => void;
}

export const TaskList: React.FC<Props> = (props) => {
    const {
        data,
        onDelete
    } = props;

    return (
        <List dense={true}>
            {data.map((item) => (
                <ListItem
                    key={item.id}
                    divider={true}
                    secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(item.id)}>
                            <DeleteIcon />
                        </IconButton>
                    }
                >
                    <ListItemText
                        primary={item.title}
                    />
                </ListItem>
            ))}
        </List>
    );
}
