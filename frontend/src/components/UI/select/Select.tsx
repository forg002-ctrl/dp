import { useState } from 'react';

type Option = {
    value: string;
    label: string;
};

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
    options: Option[];
    passClearStateFunc: (childClearStateFunc: () => void) => void;
};

export const Select = (props: SelectProps) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        props.onChange(event);
    };

    const clearState = () => {
        setSelectedValue('');
    };
    props.passClearStateFunc(clearState);

    return (
        <select
            value={selectedValue}
            onChange={handleSelectChange}
            className="block w-full py-2 px-3 border rounded-md shadow-sm bg-[#F3F8F2] focuse-visible: outline-none focus:outline-[#39A2AE] outline-offset-0"
            name={props.name}
        >
            <option disabled value="">{props.placeholder}</option>
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};