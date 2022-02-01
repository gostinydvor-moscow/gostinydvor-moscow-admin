import React from "react";
import {
    Create,
    SimpleForm,
    TextInput,
    ImageInput,
    ImageField,
    ArrayInput,
    SimpleFormIterator,
    required,
} from "react-admin";

import RichTextInput from "ra-input-rich-text";

import {defaultStyle} from "../../style";

const EventCreate = (props) => {
    return (
        <Create {...props} title="Новое мероприятие">
            <SimpleForm>
                <TextInput
                    source="url"
                    label="Уникальная ссылка"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <TextInput
                    source="title"
                    label="Заголовок"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <RichTextInput
                    source="description"
                    label="Описание"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <ArrayInput
                    source="about"
                    label="О мероприятии"
                    style={defaultStyle}
                    validate={[required()]}
                >
                    <SimpleFormIterator>
                        <RichTextInput
                            source="description"
                            label="Описание"
                            validate={[required()]}
                            style={defaultStyle}
                        />
                    </SimpleFormIterator>
                </ArrayInput>
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
                <TextInput
                    source="dateStart"
                    label="Дата начал, внимание на формат даты -> ДД.ММ.ГГГГ"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <TextInput
                    source="dateEnd"
                    label="Дата окончания, внимание на формат даты -> ДД.ММ.ГГГГ"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <TextInput
                    source="eventId"
                    label="ID мероприятия на timepad"
                    style={defaultStyle}
                />
                <TextInput
                    source="utmRefcode"
                    label="utmRefcode мероприятия на timepad"
                    style={defaultStyle}
                />
                <TextInput
                    source="eventRefUrl"
                    label="Ссылка на покупку билетов"
                    style={defaultStyle}
                />
            </SimpleForm>
        </Create>
    );
};

export default EventCreate;
