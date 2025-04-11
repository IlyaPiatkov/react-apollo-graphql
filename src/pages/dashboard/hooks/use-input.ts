import { useRef } from "react";


type Params = {
    onAdd: (title: string) => void;
}

export const useInput = ({onAdd}: Params) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {  
        onAdd(event.target.value); 

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputRef.current) {
            inputRef.current.blur();
        }
    }

    return {
        inputRef,
        onBlur,
        onKeyUp
    }
}