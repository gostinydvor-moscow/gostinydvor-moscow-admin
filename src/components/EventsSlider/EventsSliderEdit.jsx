import React from "react";

import {Edit, SimpleForm, TextInput, ImageInput, required} from "react-admin";

import {PreviewImage} from ".././";

import {defaultStyle} from "../../style";

const EventsSliderEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm redirect={false}>
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
                    <PreviewImage source="src" />
                </ImageInput>
            </SimpleForm>
        </Edit>
    );
};

export default EventsSliderEdit;
