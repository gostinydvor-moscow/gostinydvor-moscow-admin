import React from "react";

import {
    Create,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    ArrayInput,
    ImageInput,
    ImageField,
    BooleanInput,
    required,
} from "react-admin";

import {defaultStyle, arrayInputStyle} from "../../style";

const PostCreate = (props) => {
    return (
        <Create {...props} title="Новый пост">
            <SimpleForm>
                <BooleanInput label="Виден ли пост" source="visible" />
                <TextInput
                    source="title"
                    label="Имя поста"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <TextInput
                    source="description"
                    label="Краткое описание"
                    validate={[required()]}
                    style={defaultStyle}
                    multiline
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
                <ArrayInput
                    source="content"
                    label="Контент"
                    style={defaultStyle}
                    validate={[required()]}
                >
                    <SimpleFormIterator>
                        <TextInput
                            source="title"
                            label="Заголовок блока"
                            validate={[required()]}
                            style={arrayInputStyle}
                        />
                        <TextInput
                            label="Описание"
                            source="description"
                            validate={[required()]}
                            style={arrayInputStyle}
                            multiline
                        />
                        <ImageInput
                            source="imageAdmin"
                            label="Изображение (максимальный размер 2МБ)"
                            maxSize="2000000"
                            accept="image/*"
                            placeholder={<p>Перетащите файл сюда</p>}
                            style={arrayInputStyle}
                        >
                            <ImageField source="src" title="title" />
                        </ImageInput>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Create>
    );
};

export default PostCreate;
