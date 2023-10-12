import React, { useCallback, useState } from 'react';
import { TextField, FormLabel, Checkbox, Chip, Button } from '@mui/material';
import FieldService from './api/MockService';

export default function Form({ data }) {
  const [salesRegion, setSalesRegion] = useState('');
  const [defaultValue, setDefaultValue] = useState(data.default);
  const [choices, setChoices] = useState([...data.choices]);
  const [currentChoice, setCurrentChoice] = useState('');
  const [selectedChoices, setSelectedChoices] = useState([defaultValue]);

  const handleSalesRegionChange = useCallback((event) => {
    setSalesRegion(event.target.value);
  }, []);

  const handleDefaultValueChange = useCallback((event) => {
    setDefaultValue(event.target.value);
  }, []);

  const handleCurrentChoiceChange = (event) => {
    setCurrentChoice(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setChoices((prevChoices) => [...prevChoices, currentChoice]);
      setCurrentChoice('');
    }
  };

  const handleSubmit = () => {
    FieldService.saveField({
      label: salesRegion,
      required: false,
      choices: selectedChoices,
      displayAlpha: data.displayAlpha,
      default: defaultValue,
    });
  };
  return (
    <div className='form'>
      <div className='form__heading'>Field Builder</div>
      <div className='form__row'>
        <div className='form__left'>
          <FormLabel className='form__label'>Label</FormLabel>
        </div>
        <div className='form__right'>
          <TextField
            className='form__text-field'
            type='text'
            variant='outlined'
            placeholder={data.label}
            size='small'
            value={salesRegion}
            onChange={handleSalesRegionChange}
          />
        </div>
      </div>
      <div className='form__row'>
        <div className='form__left'>
          <FormLabel className='form__label'>Type</FormLabel>
        </div>
        <div className='form__right'>
          <p>Multi-select</p>
          <Checkbox
            className='form__checkbox'
            color='primary'
            checked={true}
            disabled={true}
          />
        </div>
      </div>
      <div className='form__row'>
        <div className='form__left'>
          <FormLabel className='form__label'>Default Value</FormLabel>
        </div>
        <div className='form__right'>
          <TextField
            className='form__text-field'
            type='text'
            variant='outlined'
            placeholder='Default Value'
            size='small'
            value={defaultValue}
            onChange={handleDefaultValueChange}
          />
        </div>
      </div>

      <div className='form__row'>
        <div className='form__left'>
          <FormLabel className='form__label'>Choices</FormLabel>
        </div>
        <div className='form__right'>
          <div className='multi-choice'>
            {choices.map((choice, index) => (
              <Chip
                key={index}
                className={`multi-choice__chip ${
                  selectedChoices.includes(choice)
                    ? 'multi-choice__chip--selected'
                    : ''
                }`}
                label={choice}
                onClick={() => {
                  if (selectedChoices.includes(choice)) {
                    setSelectedChoices((prevChoices) =>
                      prevChoices.filter((_choice) => _choice !== choice)
                    );
                  } else {
                    setSelectedChoices((prevChoices) => [
                      ...prevChoices,
                      choice,
                    ]);
                  }
                }}
                onDelete={() => {
                  setChoices((prevChoices) =>
                    prevChoices.filter((_, i) => i !== index)
                  );
                }}
              />
            ))}
            <div className='multi-choice__input'>
              <input
                className='multi-choice__input-field'
                type='text'
                value={currentChoice}
                onChange={handleCurrentChoiceChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        </div>
      </div>

      <div className='form__row'>
        <Button
          className='form__button--success'
          variant='contained'
          color='success'
          size='small'
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
        <p>Or</p>
        <Button
          size='small'
          className='form__button--cancel'
          color='error'
          variant='text'
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
