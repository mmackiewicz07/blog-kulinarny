
import React, { useState } from 'react';
import { Button, Form, Segment, Label, Input, TextArea, Select } from 'semantic-ui-react';

const durationOptions = [
  { key: 15, value: 15, text: '15 min' },
  { key: 30, value: 30, text: '30 min' },
  { key: 60, value: 60, text: '60 min' },
  { key: 120, value: 120, text: '120 min' },
  { key: 180, value: 180, text: '180 min' },
];

const difficultyOptions = [
  { key: 1, value: 1, text: 'bardzo łatwe' },
  { key: 2, value: 2, text: 'łatwe' },
  { key: 3, value: 3, text: 'średnie' },
  { key: 4, value: 4, text: 'trudne' },
  { key: 5, value: 5, text: 'bardzo trudne' },
];

const AddForm = ({ recipe, onSubmit, error, isLoading }) => {
  const [values, setValues] = useState(recipe || {
    name: '',
    description: '',
    duration: '',
    difficulty: '',
  });
  const [image, setImage] = useState(null);

  const onChange = (field, value) => {
    setValues(oldValues => ({
      ...oldValues,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('duration', values.duration);
    formData.append('difficulty', values.difficulty);
    if (recipe) {
      formData.append('_id', recipe._id);
      formData.append('author', recipe.author);
    }
    if (image) formData.append('image', image, image.name);
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit} size='large'>
      <Segment>
        <Input
          name="name"
          placeholder="Nazwa"
          value={values.name}
          style={{ width: '100%', margin: '10px 0' }}
          onChange={(e) => onChange('name', e.target.value)}
        />
           <Select
          placeholder="Poziom trudności"
          options={difficultyOptions}
          value={values.difficulty}
          style={{ width: '100%', margin: '0 0 10px' }}
          onChange={(e, data) => onChange('difficulty', data.value)}
        />
        <Select
          placeholder="Czas przygotowania"
          options={durationOptions}
          value={values.duration}
          style={{ width: '100%', margin: '0 0 10px' }}
          onChange={(e, data) => onChange('duration', data.value)}
        />
        <TextArea
          name="description"
          placeholder="Jak przygotować Twoją potrawę ?"
          value={values.description}
          style={{ width: '100%', margin: '0 0 10px' }}
          onChange={(e) => onChange('description', e.target.value)}
        />
         <input type="file" onChange={(e) => setImage(e.target.files[0])} style={{ width: '100%', margin: '0 0 10px' }}/>
        {error && <Label className="alertMssg" basic color="red">{error}</Label>}
        <Button secondary fluid size="large" loading={isLoading}>
          Zapisz przepis
        </Button>
      </Segment>
    </Form>
  )
}

export default AddForm;