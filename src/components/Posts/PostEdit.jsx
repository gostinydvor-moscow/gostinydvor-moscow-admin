import React from "react";

import {
    Edit,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    ArrayInput,
    ImageInput,
    BooleanInput,
    required,
} from "react-admin";

import {PreviewImage} from ".././";

import {defaultStyle, arrayInputStyle} from "../../style";

const PostsEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm redirect={false}>
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
                    <PreviewImage source="src" />
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
                            validate={[required()]}
                            style={defaultStyle}
                        >
                            <PreviewImage source="src" />
                        </ImageInput>
                    </SimpleFormIterator>
                </ArrayInput>
            </SimpleForm>
        </Edit>
    );
};

export default PostsEdit;
