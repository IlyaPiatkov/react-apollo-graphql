import { useState } from "react";

import type { List } from "@shared/typedef";


export const useTaskList = () => {
    const [taskList, setTaskList] = useState<Array<List>>([]);

    const onAdd = (title: string) => {
        if (title.trim() === '') {
            return;

        }
    
        const newTask = {
            id: Date.now().toString(),
            title
        };

        setTaskList([...taskList, newTask]);  
    }

    const onDelete = (id: string) => {
        setTaskList(taskList.filter((item) => item.id !== id));  
    };

    return {
        taskList,
        onAdd,
        onDelete
    }
}