import { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type DatePickerProps = {
    onDatePick: (date: string) => void;
    passClearStateFunc: (childClearStateFunc: () => void) => void;
};

export const Datepicker = (props: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            props.onDatePick(moment(date).format('DD/MM/YYYY'));
        }
    };

    const clearState = () => {
        setSelectedDate(null);
    };
    props.passClearStateFunc(clearState);

    return (
        <DatePicker
            className='h-10 border mt-1 rounded px-4 w-full bg-[#F3F8F2] focuse-visible: outline-none focus:outline-[#39A2AE] outline-offset-0'
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select a date"
            isClearable
        />
    );
};