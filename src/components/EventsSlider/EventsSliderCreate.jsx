import React from "react";
import {
    Create,
    SimpleForm,
    ImageInput,
    TextInput,
    ImageField,
    required,
} from "react-admin";

import {defaultStyle} from "../../style";

const EventsSliderCreate = (props) => {
    return (
        <Create {...props} title="Новый слайд">
            <SimpleForm>
                <TextInput
                    source="url"
                    label="Ссылка куда введет слайд"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <ImageInput
                    source="imageAdmin"
                    label="Изображение (максимальный размер 2МБ)"
                    maxSize="2000000"
                    accept="image/*"
                    placeholder={<p>Перетащите файл сюда</p>}
                    validate={[required()]}
                    style={defaultStyle}
                >
                    <ImageField source="src" />
                </ImageInput>
            </SimpleForm>
        </Create>
    );
};

export default EventsSliderCreate;
