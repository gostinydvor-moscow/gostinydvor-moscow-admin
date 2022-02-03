import React from "react";

import myDataProfider from "../.././myDataProvider";

import {
    Edit,
    SimpleForm,
    TextInput,
    ImageInput,
    ArrayInput,
    SimpleFormIterator,
    SelectInput,
    required,
} from "react-admin";

import {PreviewImage} from ".././";

import {defaultStyle} from "../../style";

const EventEdit = (props) => {
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        myDataProfider
            .getList("postsAll", {
                pagination: {page: 1},
                sort: {order: "ASC"},
            })
            .then(({data}) => {
                setPosts(data);
            });
	}, []);
	
    return (
        <Edit {...props}>
            <SimpleForm redirect={false}>
                <TextInput
                    source="title"
                    label="Заголовок"
                    validate={[required()]}
                    style={defaultStyle}
                />
                <TextInput
                    source="description"
                    label="Описание"
                    validate={[required()]}
                    style={defaultStyle}
                    multiline
                />
                <ArrayInput
                    source="about"
                    label="О мероприятии"
                    style={defaultStyle}
                    validate={[required()]}
                >
                    <SimpleFormIterator>
                        <TextInput
                            source="description"
                            label="Описание"
                            validate={[required()]}
                            style={defaultStyle}
                            multiline
                        />
                    </SimpleFormIterator>
                </ArrayInput>
                {posts.length ? (
                    <ArrayInput
                        source="posts"
                        label="Участники"
                        style={defaultStyle}
                        validate={[required()]}
                    >
                        <SimpleFormIterator>
                            <SelectInput
                                label="Пост"
                                source="postId"
                                choices={posts}
                                optionValue="id"
                                optionText="title"
                                validate={[required()]}
                                style={defaultStyle}
                            />
                        </SimpleFormIterator>
                    </ArrayInput>
                ) : null}
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
        </Edit>
    );
};

export default EventEdit;
