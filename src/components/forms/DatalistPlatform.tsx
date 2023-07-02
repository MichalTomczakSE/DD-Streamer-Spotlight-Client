import {useState} from 'react'
import Select from 'react-select'
import {Platform} from "../../types";

interface SelectOption {
    value: Platform;
    label: Platform;
}

interface DatalistPlatformProps {
    onChange: (selectedOption: SelectOption | null) => void;
}

export const DatalistPlatform = ({onChange}: DatalistPlatformProps) => {
    const platforms: SelectOption[] = [
        {value: 'YouTube', label: 'YouTube'},
        {value: 'Twitch', label: 'Twitch'},
        {value: 'TikTok', label: 'TikTok'},
        {value: 'Kick', label: 'Kick'},
        {value: 'Rumble', label: 'Rumble'}
    ];

    const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);

    const handleChange = (selectedOption: SelectOption | null) => {
        setSelectedOption(selectedOption);
        onChange(selectedOption);
    };
    return (
        <Select
            value={selectedOption}
            onChange={handleChange}
            options={platforms}
            required
        />
    );
};
